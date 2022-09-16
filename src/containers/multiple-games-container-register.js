import { asClass } from "awilix";
import { Core } from "sc-game-base";
import AllGamesHistoryQuery from "../query-apis/all-games-history-query";

import { MultipleGamesHttpRouter, MultipleGamesSocketRouter } from "../routers";

export class MultipleGamesContainerRegistry extends Core.ContainerRegistry {
    registerRouters() {
        super.registerRouters();

        this.container.register({
            httpRouter: asClass(MultipleGamesHttpRouter),
            socketRouter: asClass(MultipleGamesSocketRouter).proxy(),
        });
    }

    registerApis() {
        super.registerApis();

        this.container.register({
            allGamesHistoryQuery: asClass(AllGamesHistoryQuery).singleton(),
        });
    }
}
