import { Core } from "sc-game-base";

export class GameDefinition extends Core.GameDefinition {
    constructor({
        id = 0,
        name = "",
        durations = {},
        choices = [],
        choicesMapper = {},
        numberOfRoundHistory = 100,
        historyPageSize = 8,
        repositories,
        generateResult,
        settle,
    }) {
        super({ id, name, durations, choices, choicesMapper, numberOfRoundHistory, historyPageSize }, generateResult, settle);
        this.repositories = repositories;
    }
}
