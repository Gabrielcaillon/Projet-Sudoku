   let currentP, currentS, inp = [];

    /* ── helpers ── */
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function isValid(grid, r, c, num) {
      for (let x = 0; x < 9; x++) {
        if (grid[r][x] === num || grid[x][c] === num) return false;
      }
      const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
        if (grid[br + i][bc + j] === num) return false;
      }
      return true;
    }

    /* ── fill a complete solution ── */
    function fillGrid(grid) {
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        if (grid[r][c] === 0) {
          const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const n of nums) {
            if (isValid(grid, r, c, n)) {
              grid[r][c] = n;
              if (fillGrid(grid)) return true;
              grid[r][c] = 0;
            }
          }
          return false;
        }
      }
      return true;
    }

    /* ── count solutions (max 2 to check uniqueness) ── */
    function countSolutions(grid, limit = 2) {
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        if (grid[r][c] === 0) {
          let count = 0;
          for (let n = 1; n <= 9; n++) {
            if (isValid(grid, r, c, n)) {
              grid[r][c] = n;
              count += countSolutions(grid, limit - count);
              grid[r][c] = 0;
              if (count >= limit) return count;
            }
          }
          return count;
        }
      }
      return 1;
    }

    /* ── generate puzzle with unique solution ── */
    function makePuzzle(clues) {
      const sol = Array.from({ length: 9 }, () => Array(9).fill(0));
      fillGrid(sol);
      const puzzle = sol.map(r => [...r]);
      const cells = shuffle([...Array(81).keys()]);
      let removed = 0;
      for (const idx of cells) {
        if (removed >= 81 - clues) break;
        const r = Math.floor(idx / 9), c = idx % 9;
        const backup = puzzle[r][c];
        puzzle[r][c] = 0;
        const test = puzzle.map(row => [...row]);
        if (countSolutions(test) !== 1) puzzle[r][c] = backup;
        else removed++;
      }
      return { puzzle, sol };
    }

    /* ── build the DOM board ── */
    function buildBoard(puzzle, sol) {
      currentP = puzzle; currentS = sol; inp = [];
      const board = document.getElementById('board');
      board.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        inp[i] = [];
        for (let j = 0; j < 9; j++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          if (j === 2 || j === 5) cell.classList.add('b3r');
          if (i === 2 || i === 5) cell.classList.add('b3b');
          const v = puzzle[i][j];
          if (v) {
            cell.classList.add('fixed');
            cell.textContent = v;
            inp[i][j] = null;
          } else {
            const n = document.createElement('input');
            n.type = 'text'; n.maxLength = 1;
            n.setAttribute('inputmode', 'numeric');
            n.dataset.r = i; n.dataset.c = j;
            n.addEventListener('input', function () {
              this.value = this.value.replace(/[^1-9]/g, '');
              this.closest('.cell').classList.remove('er', 'ok');
              document.getElementById('status').textContent = '';
              document.getElementById('status').className = 'status';
            });
            n.addEventListener('keydown', function (e) {
              const dirs = { ArrowUp:[-1,0], ArrowDown:[1,0], ArrowLeft:[0,-1], ArrowRight:[0,1] };
              if (!dirs[e.key]) return;
              e.preventDefault();
              const [dr, dc] = dirs[e.key];
              let nr = +this.dataset.r + dr, nc = +this.dataset.c + dc;
              while (nr >= 0 && nr < 9 && nc >= 0 && nc < 9) {
                if (inp[nr][nc]) { inp[nr][nc].focus(); return; }
                nr += dr; nc += dc;
              }
            });
            cell.appendChild(n);
            inp[i][j] = n;
          }
          board.appendChild(cell);
        }
      }
    }

    /* ── public actions ── */
    function generate() {
      const clues = 81 - parseInt(document.getElementById('diff').value);
      const s = document.getElementById('status');
      s.textContent = 'génération en cours…'; s.className = 'status';
      setTimeout(() => {
        const { puzzle, sol } = makePuzzle(clues);
        buildBoard(puzzle, sol);
        s.textContent = 'nouvelle grille générée !'; s.className = 'status';
        setTimeout(() => { if (s.textContent === 'nouvelle grille générée !') s.textContent = ''; }, 2000);
      }, 10);
    }

    function chk() {
      let full = true, err = false;
      for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
        if (!inp[i][j]) continue;
        const v = parseInt(inp[i][j].value);
        const c = inp[i][j].closest('.cell');
        c.classList.remove('er', 'ok');
        if (!v) { full = false; continue; }
        if (v === currentS[i][j]) c.classList.add('ok');
        else { c.classList.add('er'); err = true; }
      }
      const s = document.getElementById('status');
      if (!full)    { s.textContent = 'grille incomplète';                  s.className = 'status err'; }
      else if (err) { s.textContent = 'des erreurs sont présentes';          s.className = 'status err'; }
      else          { s.textContent = '✓ félicitations, grille complète !';  s.className = 'status win'; }
    }

    function clr() {
      for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
        if (!inp[i][j]) continue;
        inp[i][j].value = '';
        inp[i][j].closest('.cell').classList.remove('er', 'ok');
      }
      document.getElementById('status').textContent = '';
      document.getElementById('status').className = 'status';
    }

    function sol() {
      for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
        if (!inp[i][j]) continue;
        inp[i][j].value = currentS[i][j];
        inp[i][j].closest('.cell').classList.remove('er');
        inp[i][j].closest('.cell').classList.add('ok');
      }
      document.getElementById('status').textContent = 'solution affichée';
      document.getElementById('status').className = 'status win';
    }

   
    generate(); 