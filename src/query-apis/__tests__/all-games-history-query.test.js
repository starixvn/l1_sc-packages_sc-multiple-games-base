import { stubMongoose } from "jest-micro-auto-stub";
import mongoose from "mongoose";

import AllGamesHistoryQuery from "../all-games-history-query";

jest.mock("sc-game-base/src/core/query-apis/round-query");

describe("history quer test", () => {
    /** @type {mongoose.Model}*/
    const allGamesBetsRepository = stubMongoose(mongoose.Model);

    describe("queryHistory tests", () => {
        describe("when page < 1", () => {
            it("should return empty", async () => {
                const historyQuery = new AllGamesHistoryQuery(allGamesBetsRepository);

                var actualResult = await historyQuery.queryHistory({}, 0, 10);

                expect(actualResult).toBeEmpty();
            });
        });

        describe("when  page >= 1", () => {
            it("should return data", async () => {
                const historyQuery = new AllGamesHistoryQuery(allGamesBetsRepository);
                allGamesBetsRepository.countDocuments.mockReturnValue({ exec: jest.fn() });
                allGamesBetsRepository.countDocuments().exec.mockReturnValueOnce(1);
                allGamesBetsRepository
                    .find()
                    .lean()
                    .exec.mockReturnValueOnce([
                        {
                            playerId: 1,
                            bet: {
                                uid: 1,
                                roundId: 1,
                                odd: 100,
                                even: 50,
                                betLogs: [
                                    { uid: 1, roundId: 1, choice: "odd" },
                                    { uid: 1, roundId: 1, choice: "even" },
                                ],
                                round: {
                                    id: 1,
                                    result: { red1: true, red2: false },
                                    settlementResult: { odd: true, even: false },
                                }
                            },
                        },
                    ]);

                var actualResult = await historyQuery.queryHistory({ session: { playerId: 1 } }, 1, 10);

                expect(actualResult).not.toBeEmpty();
                expect(actualResult.history.page).toEqual(1);
                expect(actualResult.history.pageSize).toEqual(10);
                expect(actualResult.history.total).toEqual(1);
                expect(actualResult.history.betLogs).toHaveLength(1);
                expect(actualResult.history.betLogs[0].betLogDetails).toHaveLength(2);
            });
        });
    });
});
