import { stub } from "jest-micro-auto-stub";
import { logger } from "sc-common";
import { Core } from "sc-game-base";
import { PlayGamePermissionValidator } from "sc-game-base/src/core/validators";
jest.mock("sc-common");

import { GameDefinition } from "../../game-definition";

import AllGamesHistoryQuery from "../../query-apis/all-games-history-query";
import { MultipleGamesSocketRouter } from "../multiple-games-socket-router";

describe("multiple games socket router test", () => {
    const definition = new GameDefinition({ id: 1, name: "game name" });
    const gameData = new Core.GameData(0);
    const userSignInConsumer = stub(Core.BaseEventConsumers.UserSignInConsumer);
    const inGameConsumer = stub(Core.BaseEventConsumers.InGameConsumer);
    const placeBetConsumer = stub(Core.BaseEventConsumers.PlaceBetConsumer);
    const userDisconnectConsumer = stub(Core.BaseEventConsumers.UserDisconnectConsumer);
    const userSignInPublisher = stub(Core.BaseEventPublishers.UserSignInPublisher);
    const historyQuery = stub(Core.QueryApis.HistoryQuery);
    const logService = stub(logger);
    const playGamePermissionValidator = stub(PlayGamePermissionValidator);

    const allGamesHistoryQuery = stub(AllGamesHistoryQuery);

    const socketClient = {
        id: "socket-id",
        on: jest.fn(),
        emit: jest.fn(),
        disconnect: jest.fn(),
    };
    gameData.realPlayers[socketClient.id] = {
        session: {},
    };

    const router = new MultipleGamesSocketRouter({
        definition,
        gameData,
        userSignInConsumer,
        inGameConsumer,
        placeBetConsumer,
        userDisconnectConsumer,
        userSignInPublisher,
        historyQuery,
        logService,
        playGamePermissionValidator,
        allGamesHistoryQuery,
    });

    router.init(socketClient);

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(logService, "logError");
        jest.spyOn(logService, "logWarning");
    });

    describe("handleGetHistory", () => {
        describe("when invalidRequest", () => {
            it("should not call query history", async () => {
                // arrange
                jest.spyOn(router, "verify").mockReturnValueOnce(false);
                jest.spyOn(allGamesHistoryQuery, "queryHistory");

                // act
                await router.handleGetAllGamesHistory({});

                // assert
                expect(allGamesHistoryQuery.queryHistory).not.toHaveBeenCalled();
            });
        });

        describe("when validRequest", () => {
            it("should query history", async () => {
                // arrange
                playGamePermissionValidator.validate.mockReturnValueOnce(true);

                // act
                await router.handleGetAllGamesHistory({});

                // assert
                expect(allGamesHistoryQuery.queryHistory).toHaveBeenCalled();
                expect(socketClient.emit).toHaveBeenCalled();
            });
        });

        describe("when have exception", () => {
            it("should log error", async () => {
                // arrange
                jest.spyOn(router, "verify").mockReturnValueOnce(true);
                jest.spyOn(allGamesHistoryQuery, "queryHistory").mockImplementation(() => {
                    throw new Error("error");
                });

                // act
                await router.handleGetAllGamesHistory({});

                // assert
                expect(logService.logError).toHaveBeenCalled();
            });
        });
    });
});
