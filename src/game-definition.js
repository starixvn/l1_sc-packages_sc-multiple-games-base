import { Core } from "sc-game-base";

export class GameDefinition extends Core.GameDefinition {
    constructor({
        id = 0,
        name = "",
        durations = {},
        choices = [],
        choicesMapper = {},
        hedgeBetGroups = [],
        numberOfRoundHistory = 100,
        historyPageSize = 8,
        repositories,
        generateResult,
        settle,
        generateRawResultForHash,
    }) {
        super(
            { id, name, durations, choices, hedgeBetGroups, choicesMapper, numberOfRoundHistory, historyPageSize },
            generateResult,
            settle,
            generateRawResultForHash
        );
        this.repositories = repositories;
    }
}
