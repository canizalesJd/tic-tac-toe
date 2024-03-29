// Creating a 3 by 3 board for the tic tac toe
function BoardCreation() {
	const columns = 3;
	const rows = 3;
	const board = [];
	// Creating a div for the board
	const boardDiv = document.createElement("div");
	boardDiv.classList.add("board");
	const gameContainer = document.querySelector(".game-container");
	// Creating 2D array
	gameContainer.appendChild(boardDiv);
	for (let i = 0; i < columns; i++) {
		// row
		board[i] = [];
		for (let j = 0; j < rows; j++) {
			// cell
			const boardCellDiv = document.createElement("div");
			boardCellDiv.classList.add("board-cell");
			boardDiv.appendChild(boardCellDiv);
			board[i][j] = "";
		}
	}
	return { board, columns, rows };
}

// Creating a function to get the row and column from a cell
function TransformCellNumber(cellNumber, columns = 3) {
	const row = Math.floor((cellNumber - 1) / columns);
	const column = (cellNumber - 1) % columns;
	return { row, column };
}

// Function to modify the board
function ModifyBoard(board, row, column, player) {
	board[row][column] = player;
	return board;
}

// Function to get the game winner
function CheckStatus(board, player1, player2) {
	for (let i = 0; i < board.length; i++) {
		// Check rows
		if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
			if (board[i][0] === player1) {
				return { status: "win", player: player1 };
			} else if (board[i][0] === player2) {
				return { status: "win", player: player2 };
			}
		}
		// Check columns
		if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
			if (board[0][i] === player1) {
				return { status: "win", player: player1 };
			} else if (board[0][i] === player2) {
				return { status: "win", player: player2 };
			}
		}
		// Check diagonals
		if (
			(board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
			(board[0][2] === board[1][1] && board[1][1] === board[2][0])
		) {
			if (board[1][1] === player1) {
				return { status: "win", player: player1 };
			} else if (board[1][1] === player2) {
				return { status: "win", player: player2 };
			}
		}
	}
	// If no winner, check for draw
	if (board.every((row) => row.every((cell) => cell !== ""))) {
		return { status: "draw", player: null };
	}
	// If no winner or draw, continue game
	return { status: "continue", player: null };
}

function Game() {
	const { board } = BoardCreation();
	// Declare players
	const player1 = "X";
	const player2 = "O";
	// Initialize current player to X
	let currentPlayer = player1;
	const gameStatusDiv = document.querySelector(".game-status");
	UpdateGameStatusDiv(`${currentPlayer}'s turn`);
	// Repeat rows * columns times
	let round = 1;
	// Select Sell number
	const cellsDiv = document.querySelectorAll(".board-cell");
	cellsDiv.forEach((cell, cellNumber) => {
		cell.addEventListener("click", () => {
			// Getting the row and column
			const { row, column } = TransformCellNumber(cellNumber + 1);
			if (
				board[row][column] === "" &&
				!gameStatusDiv.textContent.includes("wins")
			) {
				ModifyBoard(board, row, column, currentPlayer);
				// Update the cell with the selection
				if (cell.textContent === "") {
					if (currentPlayer === player1) {
						cell.textContent = "X";
						cell.classList.add("color-accent");
						currentPlayer = player2;
					} else {
						cell.textContent = "O";
						cell.classList.add("color-alternate");
						currentPlayer = player1;
					}
				}
				round++;
			} else {
				return;
			}
			// Checking the game status
			const { status, player } = CheckStatus(board, player1, player2);
			if (status === "win") {
				UpdateGameStatusDiv(`Player ${player} wins`);
				return;
			}
			if (status === "draw") {
				UpdateGameStatusDiv("It's a draw");
				return;
			}
			// If odd X, else O
			if (round % 2 !== 0) {
				currentPlayer = player1;
				// Update DIV with the current player
				UpdateGameStatusDiv(`${currentPlayer}'s turn`);
			} else {
				currentPlayer = player2;
				// Update DIV with the current player
				UpdateGameStatusDiv(`${currentPlayer}'s turn`);
			}
		});
	});
}

// Function to update the gameStatusDiv
function UpdateGameStatusDiv(status) {
	const gameStatusDiv = document.querySelector(".game-status");
	gameStatusDiv.textContent = status;
}

// Function to clear the board
function ClearBoard() {
	const gameContainer = document.querySelector(".game-container");
	gameContainer.innerHTML = "";
	Game();
}

const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", ClearBoard);

// Call game function
Game();
