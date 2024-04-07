const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winnerMessageTextElement = document.querySelector("[data-winner-message-text]");
const winnerMessage = document.querySelector("[data-winner-message]");
const restart = document.querySelector("[data-restart]");


let isCircleTurn = false;

const vitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const startGame = () => {
    isCircleTurn = false;

    for(const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true} );
    }
    
    setBoardHoverClass();
    winnerMessage.classList.remove("show-winner-message");
};

const endGame = (isDraw) => {
    // verificar por empate
    if (isDraw) {
        winnerMessageTextElement.innerText = "Empate!";
    } else {
        winnerMessageTextElement.innerText = isCircleTurn ? "Círculo Venceu!" : " X Venceu!";
    }
    winnerMessage.classList.add("show-winner-message");
};

const checkForWin = (currentPlayer)=> {
    return vitoria.some(combination => {
        return combination.every( index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkFordraw = () => {
    return [...cellElements].every( cell => {
        return cell.classList.contains('circle') || cell.classList.contains('x');
    });
};


// colocar a marca (x ou circulo) 
const placeMark = (cell, classToAdd ) => {
    cell.classList.add(classToAdd);
};
// mudar o símbolo após clicado
const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x"); 
    }
}
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};

const handleClick = (e) => { 
    // colocar a marca (x ou circulo)    
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";
    placeMark(cell, classToAdd );
    // verificar por vitótria
    const isWin = checkForWin(classToAdd);

    // verificar por empate
    const isDraw = checkFordraw();

    if (isWin) {

        endGame(false);

    } else if(isDraw) {

        endGame(true);
    } else {
        swapTurns ();
    };   
    
};
startGame()

restart.addEventListener("click", startGame);


