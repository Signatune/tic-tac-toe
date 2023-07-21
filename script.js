const gameBoard = (rows, columns) => {
  const board = new Array(rows);

  for (let x = 0; x < columns; x++) {
    board[x] = new Array(columns);
  }

  function markBoard(player, x, y) {
    board[x][y] = player;
  }

  const getBoard = () => board;

  return { markBoard, getBoard };
};

const gameController = (() => {
  let currentPlayer = "X";
  let rows = 3;
  let columns = 3;
  let board = gameBoard(rows, columns);

  const initializeGame = () => {
    board = gameBoard(rows, columns);
    displayController.renderGame(board.getBoard(), currentPlayer);
  };

  const checkWinner = (player) => {};

  const checkDraw = () => {};

  const takeTurn = (x, y) => {
    if (!gameBoard) {
      initializeGame();
    }
    board.markBoard(currentPlayer, x, y);
    checkDraw();
    checkWinner();
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

  const createCell = (mark, x, y) => {
    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = mark;

    cell.addEventListener("click", () => {
      gameController.takeTurn(x, y);
    });

    return cell;
  };

  return { renderGame };
})();

gameController.initializeGame();
