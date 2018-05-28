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
    for (let row = 1; row <= this.size; row += 1) {
      let tr = document.createElement('tr');
      let row = [];
      for (let cell = 1; cell <= this.size; cell += 1) {
        row.push(new Cell({trElem: tr}));
      }
      this.table.appendChild(tr);
      this.cells.push(row);
    }
  }

  clear() {
    this.cells.forEach((cell) => {
      cell.alive = false;
    });
  }

  randomize() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.alive = Math.random() >= 0.5 ? true : false;
      });
    });
  }

  newLayer() {

  }
}