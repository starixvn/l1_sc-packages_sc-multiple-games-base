import { GameDefinition } from "../game-definition";
import { Core } from "sc-game-base";

describe("game-definition", () => {
    describe("extends", () => {
        it("should inherit Core.ContainerRegistry", () => {
            // act
            const instance = new GameDefinition({});

            // assert
            expect(instance instanceof Core.GameDefinition);
        });
    });
});
