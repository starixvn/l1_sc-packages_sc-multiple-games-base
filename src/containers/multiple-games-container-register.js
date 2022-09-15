import { asClass } from "awilix";
import { Core } from "sc-game-base";
import AllGamesHistoryQuery from "../query-apis/all-games-history-query";

import { MultipleGamesHttpRouter } from "../routers";

export class MultipleGamesContainerRegistry extends Core.ContainerRegistry {
    registerRouters() {
        super.registerRouters();

        this.container.register({ httpRouter: asClass(MultipleGamesHttpRouter) });
    }

    registerApis() {
        super.registerApis();

        this.container.register({
            allGamesHistoryQuery: asClass(AllGamesHistoryQuery).singleton(),
        });
    }
}
