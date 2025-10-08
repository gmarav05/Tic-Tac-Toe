const  Gameboard =  function (marker) {

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


console.log(Gameboard("X"));
