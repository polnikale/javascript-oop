export default class Cell {
  constructor({trElem}) {
    this.cell = document.createElement('td');
    trElem.appendChild(this.cell);

    this.handleChangeAliveStatus = this.handleChangeAliveStatus.bind(this);

    this.init();
  }

  init() {
    this._alive = false;
    this.cell.addEventListener('click', this.handleChangeAliveStatus);
  }

  get alive() {
    return this._alive;
  }

  live() {
    this._alive = true;
    this.cell.classList.toggle('alive', true);
  }

  die() {
    this._alive = false;
    this.cell.classList.toggle('alive', false);
  }

  handleChangeAliveStatus() {
    if (this.alive) {
      this.die();
    } else {
      this.live();
    }
  }
}