import { Core } from "sc-game-base";

export class MultipleGamesSocketRouter extends Core.Routers.BaseSocketRouter {
    constructor({
        definition,
        gameData,
        userSignInConsumer,
        inGameConsumer,
        placeBetConsumer,
        userDisconnectConsumer,
        userSignInPublisher,
        historyQuery,
        logService,
        playGamePermissionValidator,
        allGamesHistoryQuery,
    }) {
        super({
            definition,
            gameData,
            userSignInConsumer,
            inGameConsumer,
            placeBetConsumer,
            userDisconnectConsumer,
            userSignInPublisher,
            historyQuery,
            logService,
            playGamePermissionValidator,
        });

        this.allGamesHistoryQuery = allGamesHistoryQuery;
    }

    init(socketClient) {
        super.init(socketClient);
        this.socketClient.on("getAllGamesHistory", this.handleGetAllGamesHistory.bind(this));
    }

    async handleGetAllGamesHistory(payload) {
        try {
            if (!this.verify()) {
                return;
            }

            const history = await this.allGamesHistoryQuery.queryHistory(
                this.gameData.realPlayers[this.socketClient.id],
                payload.page,
                this.definition.historyPageSize
            );

            this.socketClient.emit(this.definition.name, history);
        } catch (error) {
            this.logService.logError(error);
        }
    }
}
