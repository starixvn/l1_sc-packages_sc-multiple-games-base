import { asClass, asValue } from "awilix";
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

    registerModels() {
        super.registerModels();

        this.container.register({
            allGamesBetsRepository: asValue(undefined),
        });
    }

    registerApis() {
        super.registerApis();

        this.container.register({
            allGamesHistoryQuery: asClass(AllGamesHistoryQuery).singleton(),
        });
    }
}
