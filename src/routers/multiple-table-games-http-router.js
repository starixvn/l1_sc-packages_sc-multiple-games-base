import { Table } from "sc-game-base";

export class MultipleTableGamesHttpRouter extends Table.Routers.TableHttpRouter {
    constructor(appConfigs, gameData, historyQuery, userSessionsRepository, logService, definition) {
        super(appConfigs, gameData, historyQuery, userSessionsRepository, logService);

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

        app.post(
            `/api/${this.definition.name}/history`,
            (_req, res, next) => this.verifySession(_req, res, next),
            (_req, res) => this.handleHistoryRequest(_req, res)
        );
    }
}
