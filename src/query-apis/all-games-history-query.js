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
            bet: {
                _id: false,
                uid: false,
                siteId: false,
                playerId: false,
                __v: false,
                __archive: false,
                currency: false,
                operatorId: false,
                paid: false,
                betLogs: { _id: false, time: true, choice: true, amount: true },
            },
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
