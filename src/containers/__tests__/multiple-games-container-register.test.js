import { Core } from "sc-game-base";

import { MultipleGamesContainerRegistry } from "../multiple-games-container-register";
import { MultipleGamesHttpRouter } from "../../routers";
import { asClass } from "awilix";

describe("multiple-games-container-register", () => {
    describe("extends", () => {
        const instance = new MultipleGamesContainerRegistry();

        it("should inherit Core.ContainerRegistry", () => {
            expect(instance instanceof Core.ContainerRegistry);
        });
    });

    describe("registerRouters", () => {
        it("should register correct httpRouter", () => {
            // arrange
            const registry = new MultipleGamesContainerRegistry();
            registry.container = { register: jest.fn() };

            // act
            registry.registerRouters();

            // assert
            expect(registry.container.register).toBeCalledWith(
                expect.toSatisfy((x) => JSON.stringify(x.httpRouter) === JSON.stringify(asClass(MultipleGamesHttpRouter)))
            );
        });
    });
});
