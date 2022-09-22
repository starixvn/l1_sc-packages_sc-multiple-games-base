export default class AllGamesHistoryQuery {
    constructor(roundQuery, allGamesBetsRepository) {
        this.roundQuery = roundQuery;
        this.allGamesBetsRepository = allGamesBetsRepository;
    }

    convertBet(bet) {
        return bet;
    }

    convertBetLogs(betLogDetails) {
        return betLogDetails;
    }

    async queryHistory(player, page, pageSize) {
        if (page < 1 || !player || !this.allGamesBetsRepository) {
            return {};
        }

        const filter = { playerId: player.session.playerId };
        const numberOfSkippedBets = (page - 1) * pageSize;
        const total = await this.allGamesBetsRepository.countDocuments(filter).exec();
        const betProjection = {
            "bet._id": false,
            "bet.uid": false,
            "bet.siteId": false,
            "bet.playerId": false,
            "bet.__v": false,
            "bet.__archive": false,
            "bet.currency": false,
            "bet.operatorId": false,
            "bet.paid": false,
            "bet.operatorId": false,
            "bet.betLogs._id": false,
            "bet.betLogs.name": false,
            "bet.betLogs.uid": false,
            "bet.betLogs.roundId": false,
            "bet.betLogs.siteId": false,
            "bet.betLogs.currency": false,
            "bet.betLogs.operatorId": false,
            "bet.betLogs.playerId": false,
        };

        const allGamesBets = await this.allGamesBetsRepository
            .find(filter, betProjection, { sort: { "bet.time": -1 }, skip: numberOfSkippedBets, limit: pageSize })
            .lean()
            .exec();
        let betLogs = [];

        if (allGamesBets && allGamesBets.length > 0) {
            betLogs = await Promise.all(
                allGamesBets.map(async (allGamesBet) => {
                    const { bet } = allGamesBet;
                    const round = await this.roundQuery.getOne(bet.roundId, { _id: false });

                    return {
                        ...this.convertBet(bet),
                        phien: bet.roundId,
                        result: round.result,
                        settlementResult: round.settlementResult,
                        betLogDetails: this.convertBetLogs(bet.betLogs),
                    };
                })
            );
        }

        return { history: { betLogs, page, pageSize, total } };
    }
}
