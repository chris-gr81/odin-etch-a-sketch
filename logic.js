// Registrate globals and starting-conditions 
const initialize = () => {
    const initialValues = {
        startSize: 16,
        container: document.querySelector('#container')
    }
    return initialValues;
}

// Creating the board as a flex-layout with given squares
const createBoard = (size) => {
    const totalSquares = size * size;

    for (let i = 0; i < totalSquares; i++) {
        createSquare();
    }
};

// Creating a single square with neccessary attributes
const createSquare = () => {
    const square = document.createElement("div")
    square.className = "squareTest";
    container.appendChild(square);
    console.log("1");
}

// Here starts the main logic
const { startSize, container } = initialize();
createBoard(startSize);