import Cell from './cell.js';

export default class Grid {
  constructor({size = 10, gridElem}) {
    this.size = size;
    this.gridElem = gridElem;

    this.cells = [];

    this.init();
  }

  init() {
    this.table = document.createElement('table');
    this.gridElem.appendChild(this.table);
    for (let row = 0; row < this.size; row += 1) {
      let tr = document.createElement('tr');
      let row = [];
      for (let cell = 0; cell < this.size; cell += 1) {
        row.push(new Cell({trElem: tr}));
      }
      this.table.appendChild(tr);
      this.cells.push(row);
    }
  }

  createFictionalGrid() {
    const cells = [];
    this.cells.forEach((row) => {
      let newR = [];
      row.forEach((cell) => {
        let diedCell = {alive: false};
        newR.push(diedCell);
      });
      cells.push(newR);
    });
    return cells;
  }

  clear() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.die();
      });
    });
  }

  randomize() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        Math.random() >= 0.5 ? cell.live() : cell.die();
      });
    });
  }

  

  neighborIsAlive(row, col) {
    if (row < 0 || col < 0 || row >= this.size || col >= this.size) return false;

    const cell = this.cells[row][col];

    if (cell && cell.alive) return true;
  }

  newLayer() {
    let cells = [];
    for (let rowI = 0; rowI < this.size; rowI += 1) {
      let row = []
      for (let cellI = 0; cellI < this.size; cellI += 1) {
        let counter = 0;
        const currentCell = this.cells[rowI][cellI];
        let currentCellAlive;
        if (this.neighborIsAlive(rowI-1, cellI-1)) counter += 1;
        if (this.neighborIsAlive(rowI-1, cellI)) counter += 1;
        if (this.neighborIsAlive(rowI-1, cellI+1)) counter += 1;
        if (this.neighborIsAlive(rowI, cellI+1)) counter += 1;
        if (this.neighborIsAlive(rowI+1, cellI+1)) counter += 1;
        if (this.neighborIsAlive(rowI+1, cellI)) counter += 1;
        if (this.neighborIsAlive(rowI+1, cellI-1)) counter += 1;
        if (this.neighborIsAlive(rowI, cellI-1)) counter += 1;

        if (currentCell.alive) {
          if (counter < 2 || counter > 3) {
            currentCellAlive = false;
          } else {
            console.log(counter);
            currentCellAlive = true;
          }
        } else {
          if (counter === 3) {
            currentCellAlive = true;
          }
        }
        row.push(currentCellAlive);
      }
      cells.push(row);
    }
    console.log(cells);
    this.replaceRealGridWithFictional(cells);
  }

  replaceRealGridWithFictional(fakeGrid) {
    for (let rowI = 0; rowI < this.size; rowI += 1) {
      for (let cellI = 0; cellI < this.size; cellI += 1) {
        fakeGrid[rowI][cellI] ? this.cells[rowI][cellI].live() : this.cells[rowI][cellI].die();
      }
    }
  }
}