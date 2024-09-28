// globals
let mode = "default";

// Registrate globals and starting-conditions
const initialize = () => {
    const initialValues = {
        startSize: 16,
        container: document.querySelector("#container"),
        panels: [
            document.querySelector("#newField"),
            document.querySelector("#defaultMode"),
            document.querySelector("#colorMode"),
            document.querySelector("#shadowMode"),
        ],
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
    if (mode === "default") {
        square.style.backgroundColor = "black";
    } else if (mode === "color") {
        const colRed = Math.floor(Math.random() * 256);
        const colGreen = Math.floor(Math.random() * 256);
        const colBlue = Math.floor(Math.random() * 256);

        square.style.backgroundColor =
            "rgb(" + colRed + ", " + colGreen + ", " + colBlue + ")";
    }
};

// The actions for the panel options
const panelActions = (panels, container) => {
    const [newField, defaultMode, colorMode, shadowMode] = panels;
    newField.addEventListener("click", () => {
        let passed = false;
        let userPrompt = 0;
        do {
            userPrompt = parseInt(
                prompt("Enter Pixel-Shape for new field [1-100]")
            );
            if (userPrompt > 0 && userPrompt <= 100) {
                passed = true;
            }
        } while (!passed);
        createBoard(userPrompt, container);
    });
    defaultMode.addEventListener("click", () => {
        mode = "default";
        console.log(mode);
    });
    colorMode.addEventListener("click", () => {
        mode = "color";
        console.log(mode);
    });
};
// Here starts the main logic
addCSS();
const { startSize, container, panels } = initialize();
createBoard(startSize, container);
panelActions(panels, container);
