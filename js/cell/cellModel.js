export default class CellModel {
  constructor(alive = false) {
    this._alive = false;
  }

  get alive() {
    return this._alive;
  }

  die() {
    this._alive = false;
  }

  live() {
    this._alive = true;
  }
}