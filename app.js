const  Gameboard = (marker) => {

    const gameboard = [
    [marker, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
    ];
    const resetGameboard = () => {
        gameboard.fill("");
    };
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

const player1 = new Player("Arav", "X");
const player2 = new Player("Alice", "O");

player1.sayName();
player2.sayName();