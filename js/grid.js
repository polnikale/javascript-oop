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

  newLayer() {
    const cells = this.cells;
    for (let rowI = 0; rowI < this.size; rowI += 1) {
      for (let cellI = 0; cellI < this.size; cellI += 1) {
        let counter = 0;
        const currentCell = cells[rowI][cellI];
        if (cells[rowI-1][cellI-1].alive) counter += 1;
        if (cells[rowI-1][cellI].alive) counter += 1;
        if (cells[rowI-1][cellI+1].alive) counter += 1;
        if (cells[rowI][cellI+1].alive) counter += 1;
        if (cells[rowI+1][cellI+1].alive) counter += 1;
        if (cells[rowI+1][cellI].alive) counter += 1;
        if (cells[rowI+1][cellI-1].alive) counter += 1;
        if (cells[rowI][cellI-1].alive) counter += 1;

        if (currentCell.alive) {
          if (counter < 2) {
            currentCell.alive = false;
          }
        }
      }
    }
  }
}