// script.js-sudoku//

const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],    
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
    
 ];   

 
window.onload = function () {
    const sudoku = document.querySelector(".sudoku");

    for (let i = 0; i < 81; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        sudoku.appendChild(cell);
    }
};

console.log(puzzle);

for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
        const cellValue = puzzle[i][j];
        if (cellValue !== 0) {
            const cellIndex = i * 9 + j;
            const cell = document.querySelector(`.sudoku .cell:nth-child(${cellIndex + 1})`);
            cell.textContent = cellValue;
        }
    }
}