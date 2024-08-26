// components/Square.js

import React from 'react';
import './styles/Square.css'; // Import Square styles

const Square = ({ value, onClick, isDark }) => {
  return (
    <div
      className={`square ${isDark ? 'dark' : 'light'}`}
      onClick={onClick}
    >
      {value && <span className={`piece ${value.startsWith('A') ? 'playerA' : 'playerB'}`}>{value.split('-')[1]}</span>}
    </div>
  );
};

export default Square;
