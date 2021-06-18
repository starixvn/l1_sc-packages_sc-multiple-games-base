import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { init as initApis } from "sc-base-apis";
import { init as initBaseDatabase } from "sc-base-database";
import { logger } from "sc-common";

import { authenticationHelpers } from "./helpers";

export default class Startup {
    constructor(appConfigs, definitions) {
        this.appConfigs = appConfigs;
        this.definitions = definitions;
    }

    async start() {
        const app = express();
        await this.configureServices(app);
        const { socketOptions, hostingPort, enableCorsWs, corsUrls } = this.appConfigs;
        const httpServer = http.createServer(app);
        const socketServer = socketIo(httpServer, socketOptions ?? { pingInterval: 25 * 1000, pingTimeout: 60 * 1000 });
        socketServer.origins((origin, callback) => {
            if (!enableCorsWs) {
                callback(null, true);

                return;
            }

            if ((corsUrls && corsUrls.indexOf(origin) !== -1) || !origin) {
                callback(null, true);
            } else {
                callback(`Not allowed by CORS ${origin}`, false);
            }
        });

        app.set("port", process.env.PORT || hostingPort);
        app.get("/", (req, res, next) => {
            res.send(`Hello!!!`);
        });

        httpServer.listen(app.get("port"), async () => {
            console.log(`Express server started and running on port ${hostingPort}!`);
            await this.start();
        });

        middlewares.processErrorHandler.handle(httpServer, process);
    }

    async configureServices(app) {
        const corsOptions = {
            origin: (origin, callback) => {
                if (this.appConfigs.corsUrls.includes(origin) || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error(`Not allowed by CORS ${origin}`));
                }
            },
        };

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(morgan("combined"));
        app.use(helmet());

        if (this.appConfigs.enabledLogs) {
            logger.start(this.appConfigs.sentry);
        }

        await initBaseDatabase(this.appConfigs.database);
        await authenticationHelpers.init(this.appConfigs.mainServerApiSettings);
        await initApis(this.appConfigs.apiSettings);
    }

    startGames() {}

    startGame() {}
}
