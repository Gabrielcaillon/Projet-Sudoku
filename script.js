// script.js-sudoku//

function isValid(board, row, col, num) {
    // Vérifier la ligne
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) {
            return false;
        }
    }


    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) {
            return false;
        }
    }

   
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
}


function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
              
                let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                shuffleArray(numbers);

                for (let num of numbers) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if (solveSudoku(board)) {
                            return true;
                        }

                        board[row][col] = 0; // Backtrack
                    }
                }

                return false;
            }
        }
    }

    return true;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function generateSudoku() {
    let board = Array(9).fill().map(() => Array(9).fill(0));
    solveSudoku(board);
    return board;
}


function createPuzzle(board, difficulty = 40) {
    let puzzle = board.map(row => [...row]);
    let cellsToRemove = difficulty; 

    while (cellsToRemove > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if (puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            cellsToRemove--;
        }
    }

    return puzzle;
}


let fullGrid = generateSudoku();
const puzzle = createPuzzle(fullGrid, 45); 
 
window.onload = function () {
    const grid = document.querySelector(".grid");

    for (let i = 0; i < 9; i++) { 
        for (let j = 0; j < 9; j++) { 
            const valeur = puzzle[i][j];
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (valeur !== 0) {
              
                cell.textContent = valeur;
                cell.classList.add("fixe"); 
            } else {
               
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = "1";
                input.className = "input-cell";
                cell.appendChild(input);
            }
            grid.appendChild(cell);
        }   
    }
};
    