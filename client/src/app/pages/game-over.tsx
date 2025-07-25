import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GameProps = {
    gameState: any;
    winnerName: string;
    continueGame: () => void;
    endGame: () => void;
};

const GameOver: React.FC<GameProps> =({gameState, winnerName, continueGame, endGame}) =>{
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[url('/img.jpg')]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl md:text-3xl font-bold font-hachi">
              {gameState.isDraw ? "It's a Draw!" : `${winnerName} Wins!`}
            </CardTitle>
            <CardDescription className="text-md">
              {gameState.isDraw
                ? "Great game!"
                : `Congratulations ${winnerName}!`}
            </CardDescription>
            <div className="flex justify-between text-sm text-gray-600 mt-4 pt-4 border-t">
              <span>
                {gameState.player1Name} (X): {gameState.player1Score}
              </span>
              <span>
                {gameState.player2Name} (O): {gameState.player2Score}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={continueGame} className="w-full" variant="default">
              Continue Game
            </Button>
            <Button
              onClick={endGame}
              className="w-full bg-transparent"
              variant="outline"
            >
              Stop
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default GameOver;
