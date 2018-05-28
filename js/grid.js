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

  neighborIsAlive(row, col) {
    if (row < 0 || col < 0 || row >= this.size || col >= this.size) return false;

    const cell = this.cells[row][col];

    if (cell && cell.alive) return true;
  }

  countNeighborsAlive(rowI, cellI) {
    let counter = 0;
    if (this.neighborIsAlive(rowI-1, cellI-1)) counter += 1;
    if (this.neighborIsAlive(rowI-1, cellI)) counter += 1;
    if (this.neighborIsAlive(rowI-1, cellI+1)) counter += 1;
    if (this.neighborIsAlive(rowI, cellI+1)) counter += 1;
    if (this.neighborIsAlive(rowI+1, cellI+1)) counter += 1;
    if (this.neighborIsAlive(rowI+1, cellI)) counter += 1;
    if (this.neighborIsAlive(rowI+1, cellI-1)) counter += 1;
    if (this.neighborIsAlive(rowI, cellI-1)) counter += 1;
    
    return counter;
  }

  newLayer() {
    let cells = [];
    for (let rowI = 0; rowI < this.size; rowI += 1) {
      let row = []
      for (let cellI = 0; cellI < this.size; cellI += 1) {
        let counter = this.countNeighborsAlive(rowI, cellI);
        const currentCell = this.cells[rowI][cellI];
        let fakeCurrentCellAlive;

        //не знаю насколько крутое решение, но я тут создаю еще одну матрицу, в которую записываю, живет клетка, или нет. После цикла уже перепиысываю всё в реальную сетку
        if (currentCell.alive) {
          if (counter < 2 || counter > 3) {
            fakeCurrentCellAlive = false;
          } else {
            fakeCurrentCellAlive = true;
          }
        } else {
          if (counter === 3) {
            fakeCurrentCellAlive = true;
          }
        }
        row.push(fakeCurrentCellAlive);
      }
      cells.push(row);
    }
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