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
  set alive(value) {
    this._alive = value;
    this.cell.classList.toggle('alive', this._alive);
  }

  handleChangeAliveStatus() {
    this.alive = !this.alive;
  }
}