export default class gridModel {
  constructor(size = 10) {
    this._size = size;
    this._grid = [];
    this.init();
  }

  init() {
    for (let rowI = 0; rowI < this._size; rowI += 1) {
      let tr = document.createElement('tr');
      let row = [];
      for (let cell = 0; cell < this._size; cell += 1) {
        row.push({alive: Math.random() > 0.5 ? true : false});
      }
      this._grid.push(row);
    }
  }

  get grid() {
    return this._grid;
  }

  get size() {
    return this._size;
  }

}