import { utils } from "sc-common";
import { Core } from "sc-game-base";

export class MultipleGamesHttpRouter extends Core.Routers.HttpRouter {
    constructor(appConfigs, gameData, historyQuery, metricQuery, logService, definition) {
        super(appConfigs, gameData, historyQuery, metricQuery, logService);

        this.definition = definition;
    }

    init(app) {
        app.get(
            `/api/${this.definition.name}/onlineusers`,
            utils.authentication.useAuthenticate({
                authUrl: this.appConfigs.apiSettings.authUrl,
                audiences: this.appConfigs.authenticateSettings.audiences,
            }),
            (_req, res) => this.handleOnlineUsers(res)
        );

        app.post(`/api/${this.definition.name}/history`, (_req, res) =>
            this.verifySession(_req, res, this.handleHistoryRequest.bind(this))
        );
    }
}
