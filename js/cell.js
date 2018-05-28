export default class Cell {
  constructor({trElem}) {
    this.cell = document.createElement('td');
    trElem.appendChild(this.cell);
  }
}