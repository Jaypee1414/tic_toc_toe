const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  player1Name: { type: String, required: true },
  player2Name: { type: String, required: true },
  player1Wins: { type: Number, default: 0 }, 
  player2Wins: { type: Number, default: 0 },
  Draw: { type: Number, default: 0 },
  winner: { type: String, required: true },
  playedAt: { type: Date, default: Date.now }
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
