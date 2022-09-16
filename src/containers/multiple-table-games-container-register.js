import { asClass } from "awilix";
import { Table } from "sc-game-base";
import AllGamesHistoryQuery from "../query-apis/all-games-history-query";

import { MultipleTableGamesHttpRouter, MultipleGamesSocketRouter } from "../routers";

export class MultipleTableGamesContainerRegistry extends Table.TableContainerRegistry {
    registerRouters() {
        super.registerRouters();

        this.container.register({
            httpRouter: asClass(MultipleTableGamesHttpRouter),
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
