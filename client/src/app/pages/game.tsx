import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

type GameProps = {
    renderSquare: (index: number) => React.ReactNode;
    gameState: any;
    currentPlayerName: string;
    endGame: () => void
};

const Game: React.FC<GameProps> = ({renderSquare, gameState, currentPlayerName, endGame }) => {
  return (
    <div>
      <div className="min-h-screen flex-col flex items-center justify-center bg-[url('/img.jpg')] px-5 md:px-0">
        <Card className="w-full max-w-lg">
        <div className="w-full  max-w-md items-left flex mx-3" onClick={endGame}>
            <ArrowLeft className="text-sm" />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold font-hachi">Tic Tac Toe</CardTitle>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>
                {gameState.player1Name} (X): {gameState.player1Score}
              </span>
              <span>
                {gameState.player2Name} (O): {gameState.player2Score}
              </span>
            </div>
            <CardDescription className="text-lg font-medium">
              {`${currentPlayerName}'s turn (${gameState.currentPlayer})`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Game;
