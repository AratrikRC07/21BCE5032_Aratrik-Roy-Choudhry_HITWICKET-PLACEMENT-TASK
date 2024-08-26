// utils/moveValidation.js

// Function to validate a move
export const isValidMove = (character, direction, gameState) => {
    const { board, currentPlayer } = gameState;
    const position = findCharacterPosition(board, `${currentPlayer}-${character}`);
  
    if (!position) return false; // Character not found on board
  
    const [x, y] = position;
    const newPosition = calculateNewPosition(character, direction, x, y);
  
    if (!newPosition) return false; // Invalid direction or out of bounds
  
    const [newX, newY] = newPosition;
    const targetCell = board[newX][newY];
  
    // Check if the move is within the board and target cell is either empty or occupied by an opponent's character
    if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
      if (!targetCell || targetCell.charAt(0) !== currentPlayer) {
        return true;
      }
    }
  
    return false;
  };
  
  // Function to calculate new position based on move direction
  const calculateNewPosition = (character, direction, x, y) => {
    switch (character.charAt(0)) {
      case 'P': // Pawn moves
        return calculatePawnMove(direction, x, y);
      case 'H': // Heroes moves
        return character.charAt(1) === '1'
          ? calculateHero1Move(direction, x, y)
          : calculateHero2Move(direction, x, y);
      default:
        return null;
    }
  };
  
  // Helper functions for character-specific moves
  const calculatePawnMove = (direction, x, y) => {
    switch (direction) {
      case 'L': return [x, y - 1];
      case 'R': return [x, y + 1];
      case 'F': return [x - 1, y];
      case 'B': return [x + 1, y];
      default: return null;
    }
  };
  
  const calculateHero1Move = (direction, x, y) => {
    switch (direction) {
      case 'L': return [x, y - 2];
      case 'R': return [x, y + 2];
      case 'F': return [x - 2, y];
      case 'B': return [x + 2, y];
      default: return null;
    }
  };
  
  const calculateHero2Move = (direction, x, y) => {
    switch (direction) {
      case 'FL': return [x - 2, y - 2];
      case 'FR': return [x - 2, y + 2];
      case 'BL': return [x + 2, y - 2];
      case 'BR': return [x + 2, y + 2];
      default: return null;
    }
  };
  
  // Function to find character's current position on the board
  const findCharacterPosition = (board, character) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (board[i][j] === character) {
          return [i, j];
        }
      }
    }
    return null;
  };
  