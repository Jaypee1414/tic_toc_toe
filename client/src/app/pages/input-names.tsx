import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";

interface InputPlayerNameProps {
  setGameState: any;
  gameState: any;
  startGameWithNames: () => void;
  endGame: () => void;
}

const InputPlayerName: React.FC<InputPlayerNameProps> = ({
  setGameState,
  gameState,
  startGameWithNames,
  endGame,
}) => {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/img.jpg')]">
        <Card className="w-full max-w-md">
          <div className="w-full  max-w-md items-left flex mx-3" onClick={endGame}>
            <ArrowLeft className="text-sm" />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-xl md:text-3xl font-bold font-hachi">
              Enter Player Names
            </CardTitle>
            <CardDescription>
              Player 1 will be X, Player 2 will be O
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="player1">Player 1 Name (X)</Label>
              <Input
                id="player1"
                placeholder="Enter Player 1 name"
                value={gameState.player1Name}
                onChange={(e) =>
                  setGameState((prev: any) => ({
                    ...prev,
                    player1Name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="player2">Player 2 Name (O)</Label>
              <Input
                id="player2"
                placeholder="Enter Player 2 name"
                value={gameState.player2Name}
                onChange={(e) =>
                  setGameState((prev: any) => ({
                    ...prev,
                    player2Name: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              onClick={startGameWithNames}
              className="w-full"
              disabled={
                !gameState.player1Name.trim() || !gameState.player2Name.trim()
              }
            >
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InputPlayerName;
