// utils/gameUtils.js

import { initialGameState, initializeCharacters } from './gameState';

// Function to check for a winner
export const checkWinner = (players) => {
  if (players.A.remaining === 0) return 'B'; // Player B wins
  if (players.B.remaining === 0) return 'A'; // Player A wins
  return null; // No winner yet
};

// Function to determine if the game is over
export const isGameOver = (gameState) => {
  const winner = checkWinner(gameState.players);
  if (winner) {
    console.log(`Game Over! Player ${winner} wins.`);
    return true;
  }
  return false;
};

// Function to reset the game state
export const resetGame = () => {
  const { board, players } = initializeCharacters(
    initialGameState.board.map(row => [...row]), // Make a copy of the initial board
    { A: { ...initialGameState.players.A }, B: { ...initialGameState.players.B } } // Copy initial player states
  );

  return {
    ...initialGameState,
    board: board,
    players: players,
    moveHistory: [], // Reset move history
  };
};
