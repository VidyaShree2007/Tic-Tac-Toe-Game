// Get all game cells
const cells = document.querySelectorAll(".cell");

// Get status text
const status = document.getElementById("status");

// Get restart button
const restartBtn = document.getElementById("restartBtn");

// Get score elements
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");


// Game board
// There are exactly 9 boxes
let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];


// Current player
let currentPlayer = "X";

// Check whether game is over
let gameOver = false;

// Scores
let xScore = 0;
let oScore = 0;


// All possible winning combinations
const winningCombinations = [

    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]

];


// Add click event to every cell
cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        // Get the box number
        const index = cell.dataset.index;


        // Don't allow clicking an already-filled box
        // or clicking after the game is over
        if (board[index] !== "" || gameOver) {
            return;
        }


        // Put X or O in the board
        board[index] = currentPlayer;


        // Display X or O
        cell.textContent = currentPlayer;


        // Add X or O CSS class
        cell.classList.add(currentPlayer.toLowerCase());


        // Check for winner
        checkWinner();

    });

});


// Check winner
function checkWinner() {

    // Check every winning combination
    for (let combination of winningCombinations) {

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];


        // Check if three boxes are the same
        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            // Game is over
            gameOver = true;


            // Highlight winning boxes
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");


            // Increase score
            if (currentPlayer === "X") {

                xScore++;

                scoreX.textContent = xScore;

            } else {

                oScore++;

                scoreO.textContent = oScore;

            }


            // Show winner
            status.textContent =
                `🏆 PLAYER ${currentPlayer} WINS!`;

            status.classList.add("win");


            return;
        }

    }


    // Check for draw
    if (!board.includes("")) {

        gameOver = true;

        status.textContent = "🤝 IT'S A DRAW!";

        status.classList.add("draw");

        return;
    }


    // Change player
    if (currentPlayer === "X") {

        currentPlayer = "O";

    } else {

        currentPlayer = "X";

    }


    // Show next player's turn
    status.textContent =
        `Player ${currentPlayer}'s Turn`;

}


// Restart button
restartBtn.addEventListener("click", restartGame);


// Restart game
function restartGame() {

    // Clear board
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];


    // X starts again
    currentPlayer = "X";


    // Game is active
    gameOver = false;


    // Reset status
    status.textContent = "Player X's Turn";


    // Remove winner/draw styles
    status.classList.remove("win");
    status.classList.remove("draw");


    // Clear all cells
    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");

    });

}