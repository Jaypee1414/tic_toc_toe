"use client"

import { useEffect, useState } from "react"
import StartGame from "@/app/pages/start"
import InputPlayerName from "@/app/pages/input-names"
import Game from "@/app/pages/game"
import GameOver from "@/app/pages/game-over"
import  calculateWinner  from "@/lib/calculate-winner"
import axios from "axios"

type GameScreen = "start" | "names" | "game" | "gameOver"
type Player = "X" | "O"
type Square = Player | null

interface GameState {
  screen: GameScreen
  player1Name: string
  player2Name: string
  currentPlayer: Player
  board: Square[]
  winner: Player | null
  isDraw: boolean
  player1Score: number
  player2Score: number
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    screen: "start",
    player1Name: "",
    player2Name: "",
    currentPlayer: "X",
    board: Array(9).fill(null),
    winner: null,
    isDraw: false,
    player1Score: 0,
    player2Score: 0,
  })
  const [round, setRound] = useState<number>(1)

  const savePlayerResult = async() =>{
    try {
      const winnerName = gameState.winner === "X" ? gameState.player1Name : gameState.player2Name
      const loseName = gameState.winner !== "X" ? gameState.player1Name : gameState.player2Name

      const res = await axios.post("https://tic-toc-toe-6slw.onrender.com/players/game-result", {
        ...gameState,
        winnerName,
        loseName,
        round
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if(gameState.screen === "gameOver"){
      savePlayerResult()
    }
  }, [gameState])

  const handleSquareClick = (index: number) => {
    if (gameState.board[index] || gameState.winner) return

    const newBoard = [...gameState.board]
    newBoard[index] = gameState.currentPlayer

    const winner = calculateWinner(newBoard)
    const isDraw = !winner && newBoard.every((square) => square !== null)
  
    setGameState((prev) => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === "X" ? "O" : "X",
      winner : winner,
      isDraw,
      screen: winner || isDraw ? "gameOver" : "game",
      player1Score: winner === "X" ? prev.player1Score + 1 : prev.player1Score,
      player2Score: winner === "O" ? prev.player2Score + 1 : prev.player2Score,
    }))

  }

  const startGame = () => {
    setGameState((prev) => ({ ...prev, screen: "names" }))
  }

  const startGameWithNames = () => {
    if (gameState.player1Name.trim() && gameState.player2Name.trim()) {
      setGameState((prev) => ({ ...prev, screen: "game" }))
    }
  }

  const continueGame = () => {
    setRound((prev) => prev + 1)
    setGameState((prev) => ({
      ...prev,
      screen: "game",
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      isDraw: false,
    }))
  }

  const endGame = () => {
    setRound(1)
    setGameState({
      screen: "start",
      player1Name: "",
      player2Name: "",
      currentPlayer: "X",
      board: Array(9).fill(null),
      winner: null,
      isDraw: false,
      player1Score: 0,
      player2Score: 0,
    })
  }

  const renderSquare = (index: number) => (
    <button
      key={index}
      className="w-20 h-20 border-2 border-gray-300 text-3xl font-bold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed font-hachi cursor-pointer"
      onClick={() => handleSquareClick(index)}
      disabled={!!gameState.board[index] || !!gameState.winner}
    >
      {gameState.board[index]}
    </button>
  )
  
  if (gameState.screen === "start") {
    return (
      <StartGame startGame={startGame} />
    )
  }

  if (gameState.screen === "names") {
    return (
      <InputPlayerName setGameState={setGameState} gameState={gameState} startGameWithNames={startGameWithNames}  endGame={endGame}/>
    )
  }

  if (gameState.screen === "game") {
    const currentPlayerName = gameState.currentPlayer === "X" ? gameState.player1Name : gameState.player2Name

    return (
      <Game renderSquare={renderSquare} gameState={gameState} currentPlayerName={currentPlayerName} endGame={endGame}  round={round}/>
    )
  }

  if (gameState.screen === "gameOver") {
    const winnerName = gameState.winner === "X" ? gameState.player1Name : gameState.player2Name

    return (
      <GameOver gameState={gameState} winnerName={winnerName} continueGame={continueGame} endGame={endGame} />
    )
  }



  return null
}
