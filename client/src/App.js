// components/App.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Board from './components/Board';
import './styles/App.css';

const socket = io('http://localhost:59467'); // Adjust URL as needed

function App() {
  const [gameState, setGameState] = useState(null);
  const [player, setPlayer] = useState('A'); // Use both player and setPlayer

  useEffect(() => {
    // Listen for game state updates from the server
    socket.on('gameState', (state) => {
      setGameState(state);

      // Example of dynamically setting the next player
      if (state.currentPlayer) {
        setPlayer(state.currentPlayer);
      }
    });

    // Listen for game over event
    socket.on('gameOver', ({ winner }) => {
      alert(`Game Over! Player ${winner} wins!`);
    });

    return () => {
      socket.off('gameState');
      socket.off('gameOver');
    };
  }, []);

  const handleSquareClick = (x, y) => {
    if (!gameState || gameState.gameOver) return;

    // Logic to determine character and move based on clicked square
    const character = 'P1'; // Example character
    const move = 'F'; // Example move

    // Send move to the server
    socket.emit('playerMove', { player, character, move });
  };

  return (
    <div className="app-container">
      <h1>Turn-Based Chess Game</h1>
      {gameState && <Board board={gameState.board} onSquareClick={handleSquareClick} />}
    </div>
  );
}

export default App;
