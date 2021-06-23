import { Core } from "sc-game-base";

import { MultipleGamesContainerRegistry } from "../multiple-games-container-register";

describe("MultipleGamesContainerRegistry test", () => {
    const instance = new MultipleGamesContainerRegistry();

    it("_inherit Core.ContainerRegistry", () => {
        expect(instance instanceof Core.ContainerRegistry);
    });
});
