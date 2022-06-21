import { MultipleGamesHttpRouter } from "../multiple-games-http-routers";
import { Core } from "sc-game-base";

jest.mock("sc-common", () => {
    return { utils: { authentication: { useAuthenticate: jest.fn() } } };
});

describe("multiple-games-http-routers", () => {
    describe("extends", () => {
        it("should inherit Core.Routers.HttpRouter", () => {
            // act
            const instance = new MultipleGamesHttpRouter();

            // assert
            expect(instance instanceof Core.Routers.HttpRouter);
        });
    });

    describe("init", () => {
        it("should register app.get", () => {
            // arrange
            const definition = { name: "game-service" };
            const appConfigs = {
                apiSettings: {},
                authenticateSettings: {},
            };
            const instance = new MultipleGamesHttpRouter(appConfigs, undefined, undefined, undefined, undefined, definition);
            spyOn(instance, "handleOnlineUsers");
            const app = {
                get: (url, authenticate, callback) => {
                    callback && callback();
                },
                post: (_, ...callbacks) => {
                    callbacks.forEach((c) => c());
                },
            };
            spyOn(app, "get").and.callThrough();
            spyOn(app, "post").and.callThrough();

            // act
            instance.init(app);

            // assert
            expect(app.get).toBeCalledWith("/api/game-service/onlineusers", undefined, expect.anything());
            expect(app.post).toBeCalledWith("/api/game-service/history", expect.anything());
        });
    });
});
