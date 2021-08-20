import { Core } from "sc-game-base";

import { MultipleTableGamesContainerRegistry } from "../multiple-table-games-container-register";
import { MultipleTableGamesHttpRouter } from "../../routers";
import { asClass } from "awilix";

describe("multiple-table-games-container-register", () => {
    describe("extends", () => {
        const instance = new MultipleTableGamesContainerRegistry();

        it("should inherit Core.ContainerRegistry", () => {
            expect(instance instanceof Core.ContainerRegistry);
        });
    });

    describe("registerRouters", () => {
        it("should register correct httpRouter", () => {
            // arrange
            const registry = new MultipleTableGamesContainerRegistry();
            registry.container = { register: jest.fn() };

            // act
            registry.registerRouters();

            // assert
            expect(registry.container.register).toBeCalledWith(
                expect.toSatisfy((x) => JSON.stringify(x.httpRouter) === JSON.stringify(asClass(MultipleTableGamesHttpRouter)))
            );
        });
    });
});
