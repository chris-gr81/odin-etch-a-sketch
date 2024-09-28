// Registrate globals and starting-conditions
const initialize = () => {
    const initialValues = {
        startSize: 16,
        container: document.querySelector("#container"),
        newField: document.querySelector("#newField"),
    };
    return initialValues;
};

const addCSS = () => {
    const style = document.createElement("style");
    style.innerHTML = `
        body {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 10px;
        }

        #container {
            border: 1px solid black;
            width: 700px;
            height: 700px;
            display: flex;
            flex-wrap: wrap;
        }
    `;

    document.head.appendChild(style);
};

// Creating the board as a flex-layout with given squares
const createBoard = (size, container) => {
    const totalSquares = size * size;
    container.innerHTML = "";

    for (let i = 0; i < totalSquares; i++) {
        createSquare(size, container, i);
    }
};

// Creating a single square with neccessary attributes
const createSquare = (size, container, number) => {
    const square = document.createElement("div");
    square.className = "squareTest";
    square.id = "sid" + number;
    square.style.width = 700 / size + "px";
    square.style.height = 700 / size + "px";

    square.addEventListener("mouseenter", () => changeSquare(square));
    container.appendChild(square);
};

// Effects for hovering the squares
const changeSquare = (square) => {
    square.style.backgroundColor = "black";
};

// The actions for the panel options
const panelActions = (newField,container) => {
    newField.addEventListener("click", () => {
        let passed = false;
        let userPrompt = 0;
        do {
            userPrompt = parseInt(prompt("Enter Pixel-Shape for new field [1-100]"));
            if (userPrompt > 0 && userPrompt <= 100) {
                passed = true;
            }
        } while (!passed);
        createBoard(userPrompt, container);
    })

    return null;
}
// Here starts the main logic
addCSS();
const { startSize, container, newField } = initialize();
createBoard(startSize, container);
panelActions(newField, container);
