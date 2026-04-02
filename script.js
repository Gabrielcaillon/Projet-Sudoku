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

 for (let i = 0; i < 9; i++) { // Parcours des lignes
        for (let j = 0; j < 9; j++) { // Parcours des colonnes
            const valeur = puzzle[i][j];
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (valeur !== 0) {
                // Chiffre fixé au départ [cite: 5, 12]
                cell.textContent = valeur;
                cell.classList.add("fixe"); // Sera gris en CSS 
            } else {
                // Case vide à remplir par le joueur [cite: 6, 12]
                cell.contentEditable = "true"; // Active la saisie clavier
                cell.classList.add("modifiable");
            }
            sudoku.appendChild(cell);
        }   
    }
    