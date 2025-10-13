function Gameboard() {

    const rows = 3;
    const columns = 3;

    const gameboard = [];

    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];

        for (let j = 0; j < columns; j++) {
            
            gameboard[i].push(Cell());
        }
    }

    const getBoard = () => gameboard;

    const addMarker = (row, column, marker)  => {
        if (gameboard[row][column].getValue() !==0) return
        gameboard[row][column].addMarker(marker);
    };

    const printBoard = () => {
        const boardWithCellValues = gameboard.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return { getBoard, addMarker , printBoard };

}


function Cell() {
    let value = 0;

    const addToken = (player) => (value = player);
    const getValue = () => value;

    return { addToken, getValue };
    
}


function GameController(player1 = "Aravind", player2 = "Nanda") {

    const board = Gameboard();

    const players = [
        { name: player1, marker : "X" }, 
        { name: player2, marker : "O" }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name}'s marker into row ${row + 1}, column${column + 1}`);
        board.tokenMarker(row, column, getActivePlayer().marker);

    }

    const flatBoard = boardWithCellValues.flat();

    const winningConditions = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ];


    for (const combination of winningCombinations ) {

        const [a, b, c] = combination;
        
        if (flatBoard[a] !== 0 && flatBoard[a] === flatBoard[b] && flatBoard[a] === flatBoard[c]) {
            console.log(`${getActivePlayer().name }wins!`);
            board.printBoard();
            return;
        }

        switchPlayerTurn();
        printNewRound();

    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
    };


}

const game = GameController();