// components/Board.js

import React from 'react';
import './styles/Board.css'; // Import Board styles
import Square from '../Square';

const Board = ({ board, onSquareClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            value={square}
            onClick={() => onSquareClick(rowIndex, colIndex)}
            isDark={(rowIndex + colIndex) % 2 === 1}
          />
        ))
      )}
    </div>
  );
};

export default Board;
