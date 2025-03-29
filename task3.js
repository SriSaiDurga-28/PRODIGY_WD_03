// Select the game board element and message area
const board = document.getElementById('board');
const message = document.createElement('div'); // Create a message display
message.id = 'message';
message.style.marginBottom = '20px';
message.style.fontSize = '24px';
message.style.fontWeight = 'bold';
document.body.prepend(message); // Add message display at the top

// Define the starting player
let currentPlayer = 'X';

// Create an array to track the state of each cell on the board
let gameState = Array(9).fill(null);

// Dynamically create the game board with 9 cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i; // Assign an index to each cell
    cell.addEventListener('click', handleMove); // Add a click event listener to the cell
    board.appendChild(cell); // Append the cell to the board
}

// Function to handle the player's move
function handleMove(event) {
    const index = event.target.dataset.index; // Get the index of the clicked cell
    if (!gameState[index]) { // Check if the cell is empty
        gameState[index] = currentPlayer; // Update the game state
        event.target.textContent = currentPlayer; // Display the current player's marker in the cell

        // Allow the UI to update before checking for a win or tie
        setTimeout(() => {
            if (checkWin()) {
                message.textContent = `${currentPlayer} Wins!`; // Display winning message
                document.title = `${currentPlayer} Wins!`; // Update the browser tab title
                setTimeout(resetGame, 2000); // Reset the game after 2 seconds
            } else if (gameState.every(cell => cell)) {
                message.textContent = "It's a Tie!"; // Display tie message
                document.title = "It's a Tie!"; // Update browser tab title for a tie
                setTimeout(resetGame, 2000); // Reset the game after 2 seconds
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch to the other player
            }
        }, 100); // Add a slight delay to ensure the UI updates
    }
}

// Function to check if the current player has won
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal win patterns
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical win patterns
        [0, 4, 8], [2, 4, 6]             // Diagonal win patterns
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => gameState[index] === currentPlayer)
    );
}

// Function to reset the game for a new round
function resetGame() {
    gameState.fill(null); // Clear the game state
    currentPlayer = 'X'; // Reset the starting player to 'X'
    Array.from(board.children).forEach(cell => (cell.textContent = '')); // Clear the cell contents
    message.textContent = ""; // Clear the message
    document.title = "Behind the Game"; // Reset the title
}
