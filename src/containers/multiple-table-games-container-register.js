import { asClass } from "awilix";
import { Table } from "sc-game-base";

import { MultipleTableGamesHttpRouter } from "../routers";

export class MultipleTableGamesContainerRegistry extends Table.TableContainerRegistry {
    registerRouters() {
        super.registerRouters();

        this.container.register({
            httpRouter: asClass(MultipleTableGamesHttpRouter),
        });
    }
}
