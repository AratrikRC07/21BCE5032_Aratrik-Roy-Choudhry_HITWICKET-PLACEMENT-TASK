// utils/gameState.js

// Define the initial state of the game
export const initialGameState = {
    board: Array(5).fill().map(() => Array(5).fill(null)), // 5x5 grid initialized to null
    players: {
      A: { characters: [], remaining: 5 }, // Player A's characters
      B: { characters: [], remaining: 5 }  // Player B's characters
    },
    currentPlayer: 'A', // Player A starts the game
    moveHistory: [],    // Keeps track of all moves made
  };
  
  // Function to initialize characters on the board
  export const initializeCharacters = (board, players) => {
    // Example character placement, adjust as needed for initial setup
    players.A.characters = ['P1', 'H1', 'H2', 'P2', 'P3'];
    players.B.characters = ['P1', 'H1', 'H2', 'P2', 'P3'];
  
    // Set initial positions on the board
    board[0] = ['A-P1', 'A-H1', 'A-H2', 'A-P2', 'A-P3'];
    board[4] = ['B-P1', 'B-H1', 'B-H2', 'B-P2', 'B-P3'];
  
    return { board, players };
  };
  
  // Function to update the game state after a move
  export const updateGameState = (gameState, move) => {
    const { board, players, currentPlayer } = gameState;
    const [character, direction] = move.split(':');
  
    // Compute new position
    const newPosition = calculateNewPosition(character, direction, board);
    if (newPosition) {
      // Update board
      const updatedBoard = updateBoard(board, character, newPosition);
  
      // Update players and remaining characters if a character is killed
      const updatedPlayers = updatePlayers(players, updatedBoard, newPosition, currentPlayer);
  
      // Toggle the current player
      const nextPlayer = currentPlayer === 'A' ? 'B' : 'A';
  
      return {
        ...gameState,
        board: updatedBoard,
        players: updatedPlayers,
        currentPlayer: nextPlayer,
        moveHistory: [...gameState.moveHistory, move],
      };
    }
  
    return gameState; // Return unchanged state if move is invalid
  };
  
  // Helper function to calculate new position based on the character and direction
  const calculateNewPosition = (character, direction, board) => {
    // Find the current position of the character
    let currentX, currentY;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] && board[i][j].endsWith(character)) {
          currentX = i;
          currentY = j;
          break;
        }
      }
    }
  
    // Calculate new position based on direction
    let newX = currentX;
    let newY = currentY;
    
    switch (direction) {
      case 'L':
        newY -= 1; // Move left
        break;
      case 'R':
        newY += 1; // Move right
        break;
      case 'F':
        newX -= 1; // Move forward (up)
        break;
      case 'B':
        newX += 1; // Move backward (down)
        break;
      case 'FL':
        newX -= 1; newY -= 1; // Move forward-left
        break;
      case 'FR':
        newX -= 1; newY += 1; // Move forward-right
        break;
      case 'BL':
        newX += 1; newY -= 1; // Move backward-left
        break;
      case 'BR':
        newX += 1; newY += 1; // Move backward-right
        break;
      default:
        return null; // Invalid direction
    }
  
    // Check if the new position is within the board limits
    if (newX < 0 || newX >= 5 || newY < 0 || newY >= 5) {
      return null; // Out of board bounds
    }
  
    return [newX, newY];
  };
  
  // Helper function to update board
  const updateBoard = (board, character, newPosition) => {
    const [x, y] = newPosition;
    // Clear the previous position of the character on the board
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (board[i][j] === character) {
          board[i][j] = null;
        }
      }
    }
  
    // Place character at the new position
    board[x][y] = character;
    return board;
  };
  
  // Helper function to update players
  const updatePlayers = (players, board, newPosition, currentPlayer) => {
    const [x, y] = newPosition;
    const opponentPlayer = currentPlayer === 'A' ? 'B' : 'A';
    const opponentCharacter = board[x][y] ? board[x][y].split('-')[1] : null;
  
    if (opponentCharacter && players[opponentPlayer].characters.includes(opponentCharacter)) {
      // Remove the opponent's character from the game
      players[opponentPlayer].characters = players[opponentPlayer].characters.filter(
        (character) => character !== opponentCharacter
      );
      players[opponentPlayer].remaining -= 1;
    }
  
    return players;
  };
  