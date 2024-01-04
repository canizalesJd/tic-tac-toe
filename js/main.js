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
			console.log("Cell not empty, select a different one");
		}
		console.log(board);
	}
}

// Function to modify the board
function ModifyBoard(board, row, column, player) {
	board[row][column] = player;
	return board;
}

Game();
