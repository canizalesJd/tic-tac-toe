// Creating a 3 by 3 board for the tic tac toe
function BoardCreation() {
	const columns = 3;
	const rows = 3;
	const board = [];
	// Creating 2D array
	for (let i = 0; i < columns; i++) {
		// row
		board[i] = [];
		for (let j = 0; j < rows; j++) {
			// cell
			board[i][j] = "";
		}
	}
	return { board, columns, rows };
}

// Creating a function to select a cell
function SelectCell(columns = 3, rows = 3) {
	let cell = prompt("Select a cell");
	while (isNaN(cell) || cell === "" || cell < 1 || cell > rows * columns) {
		cell = prompt("Invalid input, select a cell again");
	}
	const row = Math.floor((cell - 1) / columns);
	const column = (cell - 1) % columns;
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
				console.log("Player 2 wins");
				return { status: "win", player: player2 };
			}
		}
		// Check diagonals
		if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
			if (board[0][0] === player1) {
				return { status: "win", player: player1 };
			} else if (board[0][0] === player2) {
				return { status: "win", player: player2 };
			}
		}
	}
	// If no winner, check for draw
	if (board.every((row) => row.every((cell) => cell !== ""))) {
		console.log("Draw");
		return { status: "draw", player: null };
	}
	// If no winner or draw, continue game
	return { status: "continue", player: null };
}

function Game() {
	const { rows, columns, board } = BoardCreation();
	// Declare players
	const player1 = "X";
	const player2 = "O";
	// Initialize current player to X
	let currentPlayer = player1;
	// Repeat rows * columns times
	let round = 1;
	while (round <= rows * columns) {
		// If odd X, else O
		if (round % 2 !== 0) {
			currentPlayer = player1;
		} else {
			currentPlayer = player2;
		}
		// Getting the row and column
		const { row, column } = SelectCell(columns, rows);
		if (board[row][column] === "") {
			ModifyBoard(board, row, column, currentPlayer);
			round++;
		} else {
			alert("Cell not empty, select a different one");
		}
		const { status, player } = CheckStatus(board, player1, player2);
		if (status === "win") {
			console.log(`Player ${player} wins1`);
			return `Player ${player} wins`;
		}
		if (status === "draw") {
			return `It's a draw`;
		}
	}
}

// Call game function
Game();
