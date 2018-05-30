export default class gridModel {
  constructor({size = 10, Cell}) {
    this._size = size;
    this._Cell = Cell;
    this._cells = [];
    this.init();
  }

  init() {
    for (let rowI = 0; rowI < this._size; rowI += 1) {
      let tr = document.createElement('tr');
      let row = [];
      for (let cell = 0; cell < this._size; cell += 1) {
        row.push(new this._Cell({trElem: tr}));
      }
      this._cells.push(row);
    }
  }

  get cells() {
    return this._cells;
  }

  get size() {
    return this._size;
  }

}