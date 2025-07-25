import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import axios from "axios";

type StartGameProps = {
  startGame: () => void;
};

type Player = {
  map(arg0: (player: Player) => any): React.ReactNode;
  player1Name: string;
  player2Name: string;
  player1Wins: number;
  player2Wins: number;
  winner: string;
  playedAt: Date;
  Draw: number

}

const StartGame: React.FC<StartGameProps> = ({ startGame }) => {
  const [playerState, setPlayerState] = useState<Player[]>([]);

  const fetchPlayerGame = async () => {
    try {
      const res = await axios.get("https://tic-toc-toe-6slw.onrender.com/players")
      setPlayerState(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchPlayerGame();
  }, []);

  console.log(playerState)
  return (
    <div>
      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-evenly md:justify-between bg-[url('/img.jpg')] ">
        <div className="w-full px-5 md:px-0  items-center flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-4xl font-extrabold text-gray-800 font-hachi">
                Tic Tac Toe
              </CardTitle>
              <CardDescription className="text-sm md:text-lg">
                Challenge a friend to the classic game!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => startGame()}
                className="w-full text-md md:text-lg py-6"
                size="lg"
              >
                Start New Game
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="w-full px-5 md:px-0  items-center flex justify-center">
        <Card className="w-screen max-w-sm md:max-w-md h-[350px] md:h-screen">
          <CardHeader className="text-center">
            <CardTitle className="text-lg md:text-5xl font-bold text-gray-800  font-hachi italic">
              Scoreboard
            </CardTitle>
            <CardDescription className="text-md md:text-lg">
              Player History Game Scoreboard
            </CardDescription>
            <CardContent className="px-0 max-h-[250px] md:max-h-[650px] overflow-y-auto scroll-hide">
              {playerState.length > 0 && playerState.map((player: Player, index: number) => (
                <div key={index} className="flex flex-col gap-2 mt-5 w-full">
                  <span className="text-md">{player.player1Name} ({player.player1Wins}) vs {player.player2Name} ({player.player2Wins}) </span>
                  <span className="text-xs text-gray-600"><span className="font-bold text-black italic">Draw :</span>{player.Draw} <span className="font-bold text-black italic">Winner :</span>{player.player1Wins > player.player2Wins ? player.player1Name : player.player2Name}</span>
                </div>
              ))}
            </CardContent>
          </CardHeader>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
