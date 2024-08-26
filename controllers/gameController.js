// controllers/gameController.js

// Initial game state
let gameState = {
    board: Array(5).fill(null).map(() => Array(5).fill(null)), // 5x5 grid
    players: {
      A: { pieces: {}, isTurn: true }, // Player A
      B: { pieces: {}, isTurn: false } // Player B
    },
    gameOver: false,
    winner: null
  };
  
  // Initialize a new game
  function initializeGame() {
    // Clear the board and set up initial positions
    gameState.board = Array(5).fill(null).map(() => Array(5).fill(null));
    gameState.players.A.pieces = { 'P1': [0, 0], 'H1': [0, 1], 'H2': [0, 2] };
    gameState.players.B.pieces = { 'P1': [4, 4], 'H1': [4, 3], 'H2': [4, 2] };
    gameState.players.A.isTurn = true;
    gameState.players.B.isTurn = false;
    gameState.gameOver = false;
    gameState.winner = null;
  
    // Set up initial pieces on the board
    Object.entries(gameState.players.A.pieces).forEach(([name, [x, y]]) => {
      gameState.board[x][y] = `A-${name}`;
    });
    Object.entries(gameState.players.B.pieces).forEach(([name, [x, y]]) => {
      gameState.board[x][y] = `B-${name}`;
    });
  }
  
  // Check if the move is valid
  function validateMove(player, character, move) {
    const [x, y] = gameState.players[player].pieces[character];
    let newX = x, newY = y;
  
    switch (move) {
      case 'L': newY -= 1; break; // Left
      case 'R': newY += 1; break; // Right
      case 'F': newX -= 1; break; // Forward
      case 'B': newX += 1; break; // Backward
      case 'FL': newX -= 1; newY -= 1; break; // Forward-Left
      case 'FR': newX -= 1; newY += 1; break; // Forward-Right
      case 'BL': newX += 1; newY -= 1; break; // Backward-Left
      case 'BR': newX += 1; newY += 1; break; // Backward-Right
      default: return false; // Invalid move
    }
  
    // Ensure new coordinates are within the board bounds
    if (newX < 0 || newX >= 5 || newY < 0 || newY >= 5) {
      return false;
    }
  
    // Ensure the move does not target a friendly piece
    if (gameState.board[newX][newY] && gameState.board[newX][newY].startsWith(player)) {
      return false;
    }
  
    return { newX, newY };
  }
  
  // Execute a player's move
  function processMove(player, character, move) {
    if (gameState.gameOver) return; // Do nothing if the game is over
  
    if (!gameState.players[player].isTurn) {
      return; // Not this player's turn
    }
  
    const moveResult = validateMove(player, character, move);
    if (!moveResult) {
      return; // Invalid move
    }
  
    const { newX, newY } = moveResult;
    const [oldX, oldY] = gameState.players[player].pieces[character];
  
    // Remove any opponent's piece in the target position
    if (gameState.board[newX][newY] && !gameState.board[newX][newY].startsWith(player)) {
      const opponent = player === 'A' ? 'B' : 'A';
      const opponentCharacter = gameState.board[newX][newY].split('-')[1];
      delete gameState.players[opponent].pieces[opponentCharacter];
  
      // Check for game-over condition
      if (Object.keys(gameState.players[opponent].pieces).length === 0) {
        gameState.gameOver = true;
        gameState.winner = player;
      }
    }
  
    // Move the piece on the board
    gameState.board[oldX][oldY] = null;
    gameState.board[newX][newY] = `${player}-${character}`;
    gameState.players[player].pieces[character] = [newX, newY];
  
    // Toggle turns
    gameState.players.A.isTurn = !gameState.players.A.isTurn;
    gameState.players.B.isTurn = !gameState.players.B.isTurn;
  }
  
  // Export controller functions
  module.exports = {
    initializeGame,
    processMove
  };
  