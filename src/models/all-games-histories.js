import mongoose from "mongoose";

const bet = {
    playerId: { type: Number, required: true },
    bet: { type: Object, required: true },
};

export function allGamesHistoriesModel(modelName) {
    return mongoose.model(modelName, new mongoose.Schema(bet));
}
