const express = require("express");
const Player = require("../models/player");

const router = express.Router();

router.get("/", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

router.post('/game-result', async (req, res) => {
  try {
    const {
      player1Name,
      player2Name,
      winnerName,
      player1Score,
      player2Score,
      isDraw,
      round
    } = req.body;

    const drawCount = isDraw ? 1 : 0;
    const existingMatch = await Player.findOne({
      $or: [
        { player1Name, player2Name },
        { player1Name: player2Name, player2Name: player1Name }
      ]
    });


    if (existingMatch) {
      if(round === 1){
        existingMatch.player1Wins += player1Score;
        existingMatch.player2Wins += player2Score;
      }else{
        existingMatch.player1Wins += ( player1Score - existingMatch.player1Wins);
        existingMatch.player2Wins += (player2Score - existingMatch.player2Wins);
      }
      existingMatch.player1Name = player1Name;
      existingMatch.player2Name = player2Name;
      existingMatch.winner = winnerName;
      existingMatch.Draw += drawCount;
      existingMatch.playedAt = new Date();

      await existingMatch.save();
      return res.status(200).json({ message: 'Match updated successfully', match: existingMatch });
    } else {

      const newMatch = new Player({
        player1Name,
        player2Name,
        player1Wins: player1Score,
        player2Wins: player2Score,
        Draw: drawCount,
        winner: winnerName
      });

      await newMatch.save();

      return res.status(201).json({ message: 'New match created', match: newMatch });
    }
  } catch (err) {
    console.error('Error saving game result:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
