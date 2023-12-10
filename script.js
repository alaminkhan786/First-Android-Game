document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetBtn = document.getElementById("resetBtn");
    const newGameBtn = document.getElementById("newGameBtn");
    const gameContainer = document.getElementById("gameContainer");
    const endGameContainer = document.getElementById("endGameContainer");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkTie() {
        return !gameBoard.includes("");
    }

    function showEndScreen(messageText) {
        endGameContainer.style.display = "block";
        gameContainer.style.display = "none";
        document.getElementById("endMessage").innerText = messageText;
    }

    function handleClick(index) {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].innerText = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                showEndScreen(`${winner} wins!`);
            } else if (checkTie()) {
                showEndScreen("It's a tie!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        handleClick(index);
    }

    function handleResetClick() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        message.innerText = "";
        cells.forEach(cell => {
            cell.innerText = "";
        });

        endGameContainer.style.display = "none";
        gameContainer.style.display = "block";
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    resetBtn.addEventListener("click", handleResetClick);
    newGameBtn.addEventListener("click", handleResetClick);
});
