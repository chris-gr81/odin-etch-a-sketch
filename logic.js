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
        font-family: Verdana, Geneva, Tahoma, sans-serif;
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 20px;
            background-color: #f0f4f8;
        }
            
        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        button:hover {
            background-color: #0056b3;
            transform: scale(1.05);
        }
        #container {
            background-color: white;
            border: 1px solid black;
            width: 500px;
            height: 500px;
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
    square.style.width = 500 / size + "px";
    square.style.height = 500 / size + "px";
    square.style.opacity = "0";

    square.addEventListener("mouseenter", () => changeSquare(square));
    container.appendChild(square);
};

// Effects for hovering the squares
const changeSquare = (square) => {
    if (mode === "default") {
        square.style.backgroundColor = "black";
        square.style.opacity = "1";
    } else if (mode === "color") {
        const colRed = Math.floor(Math.random() * 256);
        const colGreen = Math.floor(Math.random() * 256);
        const colBlue = Math.floor(Math.random() * 256);

        square.style.opacity = "1";
        square.style.backgroundColor =
            "rgb(" + colRed + ", " + colGreen + ", " + colBlue + ")";
    } else if (mode === "shadow") {
        let oldOpacity = square.style.opacity;

        if (!oldOpacity) {
            oldOpacity = "0";
        }

        let floatOpacity = parseFloat(oldOpacity);

        if (floatOpacity < 1) {
            square.style.opacity = (floatOpacity + 0.1).toFixed(1);
            square.style.backgroundColor = "black";
        }

        
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

    shadowMode.addEventListener("click", () => {
        mode = "shadow";
    });
};
// Here starts the main logic
addCSS();
const { startSize, container, panels } = initialize();
createBoard(startSize, container);
panelActions(panels, container);
