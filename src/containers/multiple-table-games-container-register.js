import { asClass } from "awilix";
import { Core } from "sc-game-base";

import { MultipleTableGamesHttpRouter } from "../routers";

export class MultipleTableGamesContainerRegistry extends Core.ContainerRegistry {
    registerRouters() {
        super.registerRouters();

        this.container.register({
            httpRouter: asClass(MultipleTableGamesHttpRouter),
        });
    }
}
