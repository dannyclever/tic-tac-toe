

const Player = (sign) => {
    this.sign = sign;


    const getSign = () => {
        return sign;
    };


    return { getSign };
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    
    const setField = (index, sign) => {
        if (index > board.length) return;
        return board[index];
    };


    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };


    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setField, getField, reset };
})();

const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");
    const messageElement = document.querySelector("#message");
    const restartButton = document.querySelector("#restart-button");

    fieldElements.forEach((field) => 
    field.addEventListener("click", (e) => {
        if(gameController.getIsOver() || e.target.textContent !== "") return;
        gameController.playRound(parseInt(e.target.dataset.index));
        updateGameboard();
    })
    );

    restartButton.addEventListener("click", (e) => {
        gameBoard.reset();
        gameController.reset();
        updateGameboard();
        setMessageElement("Player X's turn");
    });

    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
            
        }
    };


    const setResultMessage = (winner) => {
        if (winner == "Draw") {
            setMessageElement("It's a draw!");
        } else {
            setMessageElement(`Player ${winner} has won!`);
        }
    };


    const setMessageElement = (message) => {
        messageElement.textContent = message;
    }

    return { setResultMessage, setMessageElement };
})();