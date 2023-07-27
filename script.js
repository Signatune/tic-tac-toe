const gameBoard = (rows, columns) => {
  const board = new Array(rows);

  for (let x = 0; x < columns; x++) {
    board[x] = new Array(columns).fill(" ");
  }

  function markBoard(player, x, y) {
    board[x][y] = player;
  }

  const getBoard = () => board.slice();

  const getRow = (index) => board[index];

  const getColumn = (index) => {
    return board.map((row) => {
      return row[index];
    });
  };

  const getLeftDiagonal = () => {
    return board.map((row, index) => {
      return row[index];
    });
  };

  const getRightDiagonal = () => {
    return board.map((row, index) => {
      return row[rows - index - 1];
    });
  };

  return {
    markBoard,
    getBoard,
    getRow,
    getColumn,
    getLeftDiagonal,
    getRightDiagonal,
  };
};

const gameController = (() => {
  let currentPlayer = "X";
  let rows = 3;
  let columns = 3;
  let board = gameBoard(rows, columns);
  let winner = null;

  const initializeGame = () => {
    board = gameBoard(rows, columns);
    winner = null;
    displayController.renderGame(board.getBoard(), currentPlayer);
    displayController.renderWinner(winner);
  };

  const checkWinner = (player) => {
    for (i = 0; i < rows; i++) {
      let row = board.getRow(i);

      if (row.every((cell) => cell == player)) {
        return true;
      }
    }

    for (i = 0; i < columns; i++) {
      let column = board.getColumn(i);

      if (column.every((cell) => cell == player)) {
        return true;
      }
    }

    if (board.getLeftDiagonal().every((cell) => cell == player)) {
      return true;
    }

    if (board.getRightDiagonal().every((cell) => cell == player)) {
      return true;
    }

    return false;
  };

  const checkDraw = () => {};

  const takeTurn = (x, y) => {
    if (!gameBoard) {
      initializeGame();
    }
    board.markBoard(currentPlayer, x, y);
    checkDraw();
    if (checkWinner("X")) {
      winner = "X";
      displayController.renderWinner(winner);
    } else if (checkWinner("O")) {
      winner = "O";
      displayController.renderWinner(winner);
    }
    togglePlayer();
    displayController.renderGame(board.getBoard(), currentPlayer);
  };

  const togglePlayer = () => {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
  };

  return { takeTurn, initializeGame };
})();

const displayController = (() => {
  const boardElement = document.querySelector(".board");
  const playerElement = document.querySelector(".player")[0];
  const winnerElement = document.querySelector("#winner");

  const renderGame = (board, player) => {
    let cells = [];
    let rows = board.length;
    let columns = board[0].length;
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let mark = board[x][y];
        const cell = createCell(mark, x, y);
        cells.push(cell);
      }
    }

    boardElement.replaceChildren(...cells);
  };

  const renderWinner = (player) => {
    if (player != null) {
      winnerElement.textContent = player;
    } else {
      winnerElement.textContent = "None";
    }
  };

  const createCell = (mark, x, y) => {
    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = mark;

    if (mark == " ") {
      cell.addEventListener("click", () => {
        gameController.takeTurn(x, y);
      });
    }

    return cell;
  };

  return { renderGame, renderWinner };
})();

document
  .querySelector(".reset")
  .addEventListener("click", () => gameController.initializeGame());

gameController.initializeGame();
