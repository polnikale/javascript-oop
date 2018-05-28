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
      for (let cell = 1; cell <= this.size; cell += 1) {
        this.cells.push(new Cell({trElem: tr}));
      }
      this.table.appendChild(tr);
    }
  }
}