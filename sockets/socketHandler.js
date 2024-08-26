// sockets/socketHandler.js

const { initializeGame, processMove } = require('../controllers/gameController');

function handleSocketEvents(io) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Initialize game state for new connections
    initializeGame();

    // Emit the initial game state to the client
    socket.emit('gameState', gameState);

    // Handle player move event
    socket.on('playerMove', ({ player, character, move }) => {
      processMove(player, character, move);

      // Broadcast updated game state to all connected clients
      io.emit('gameState', gameState);

      // Notify clients if the game is over
      if (gameState.gameOver) {
        io.emit('gameOver', { winner: gameState.winner });
      }
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}

module.exports = handleSocketEvents;
