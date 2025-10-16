function Gameboard() {

    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const placeMarker = (row, column, marker)  => {
        board[row][column].addToken(marker);
    };

   const printBoard = () => {
        const fullBoard = board.map(row => row.map(cell => cell.getValue()));
        return fullBoard;
   }

    return { getBoard, placeMarker , printBoard }
}

function cell() {
    let value = '';
    const addToken = (player) => (value = player);
    const getValue = () => value;

    return { addToken, getValue };
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {

    const board = Gameboard();

    const players = [
        { name: playerOneName, token : 'X' }, 
        { name: playerTwoName, token : 'O' },
    ];

    let isGameOver = false;
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        updateScreen.createDiv();
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(board.printBoard());
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {

        if (isGameOver) { 
            updateScreen();
            return;
        }
            

        console.log(`${getActivePlayer().name}'s has placed their mark in column ${column}, row ${row}`);

        board.placeMarker(row, column, getActivePlayer().token);

        if(checkForWin(board.getBoard(),getActivePlayer().token)) {
            console.log(`${getActivePlayer().name} wins`);
            console.log(board.printBoard());
            isGameOver = true;
            return;
        }
         
        if(checkForDraw(board.getBoard())) {
            console.log(`It's a Draw`);
            console.log(board.printBoard());
            isGameOver = true;
            return;
        }

        switchPlayerTurn();
        printNewRound();
    };
    
    const checkForDraw = currentBoard => {
        const flatBoard = currentBoard.flat();
        return flatBoard.every(cell => cell.getValue() !== '');
    };

    const checkForWin = (currentBoard, playerToken) => {
        const boardValues = currentBoard.map(row => 
            row.map(cell => cell.getValue())
        );

        const checkLine = line => {
            return line.every(cellValue => cellValue === playerToken);
        };

        for(const row of boardValues) {
            if(checkLine(row)) return true;
        }


        for (let col = 0; col < 3; col++) {
            const column = boardValues.map(row => row[col]);
            if(checkLine(column)) return true;   
        }

        const primaryDiagonal = [
            boardValues[0][0],
            boardValues[1][1],
            boardValues[2][2],
        ];

        if(checkLine(primaryDiagonal)) return true;

        const secondaryDiagonal = [
            boardValues[0][2],
            boardValues[1][1],
            boardValues[2][0],
        ];

        if(checkLine(secondaryDiagonal)) return true;

        return false;
    };

    
    const updateScreen = Screen(board, getActivePlayer, switchPlayerTurn, checkForWin);
    updateScreen.createDiv(); 
    
    printNewRound();

        return {
        playRound,
        getActivePlayer,
        };

};


function Screen (board, getActivePlayer, switchPlayerTurn, checkForWin) {

    const createDiv = () => {

        const GameD = document.querySelector('.gameboard');
        GameD.innerHTML = '';
        const message = document.querySelector('#playersTurn');

        board.getBoard().forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                let div = document.createElement('div');
                div.style.backgroundColor = 'whitesmoke';
                div.textContent = cell.getValue();
                div.setAttribute('class', 'cell');
                div.style.width = '60px';
                div.style.height = '60px';
                div.style.marginLeft = '18px';
                div.style.border = '1px solid white';
                div.style.fontSize = '2rem';

                div.addEventListener('click', () => {
                    if(cell.getValue() === '') {
                        cell.addToken(getActivePlayer().token);
                        div.textContent = getActivePlayer().token;

                        if(checkForWin(board.getBoard(),getActivePlayer().token)) {
                            message.textContent = `${getActivePlayer().name} wins!`

                        } else {
                            switchPlayerTurn();
                            message.textContent = `${getActivePlayer().name}'s turn`;
                        }
                    }
                });

                GameD.appendChild(div);

            });
        });
    };

    return {createDiv};

}

GameController();

const restart = document.querySelector('#restart');
restart.addEventListener('click', () => {
    window.location.reload();
});