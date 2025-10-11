const  Gameboard = (marker) => {

    const gameboard = [
    [marker, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
    ];
    
    console.log(gameboard);
};


// console.log(Gameboard("X"));

function Player(name, marker) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.name = name;
    this.marker = marker;
    this.sayName = function() {
        console.log(this.name);
    };
    Gameboard(this.marker);
}

// function Player(name, marker) {
//     const player1_marker = 'X' 

    
// }

// const player1 = new Player("Arav", "X");
// const player2 = new Player("Alice", "O");

// player1.sayName();
// player2.sayName();


function Gameboard() {

    const rows = 3;
    const columns = 3;

    const gameboard = [];

    for (let i = 0; i < rows; i++) {
        
        gameboard[i] = [];

        for (let j = 0; j < columns; j++) {
            
            // gameboard[i] = [];                
        }

    }


    const getBoard = () => gameboard;

    const tokenMarker = (row, column, marker)  => {




    }



}


