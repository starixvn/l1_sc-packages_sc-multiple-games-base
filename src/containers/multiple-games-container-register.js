import { asClass } from "awilix";
import { Core } from "sc-game-base";

import { MultipleGamesHttpRouter } from "../routers";

export class MultipleGamesContainerRegistry extends Core.ContainerRegistry {
    registerRouters() {
        super.registerRouters();

        this.container.register({ httpRouter: asClass(MultipleGamesHttpRouter) });
    }
}
