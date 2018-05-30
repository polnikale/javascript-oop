export default class GridView {
  constructor(presenter) {
    this.presenter = presenter;
    this.gridElement = document.querySelector('#grid').appendChild(document.createElement('table'));

    this.handleGridClick = this.handleGridClick.bind(this);

    this.init();
  }

  init() {
    this.presenter.viewModel.grid.forEach((row) => {
      let rowElem = document.createElement('tr');
      row.forEach((cell) => {
        let cellElem = document.createElement('td');
        cellElem.classList.toggle('alive', cell.alive);
        rowElem.appendChild(cellElem);
      });
      this.gridElement.appendChild(rowElem);
    });
    this.gridElement.addEventListener('click', this.handleGridClick);
  }

  handleGridClick(event) {
    const cell = event.target;
    const row = event.target.parentNode;
    if (cell.tagName !== 'TD') return;
    let rowI = [...this.gridElement.children].indexOf(row);
    let cellI = [...row.children].indexOf(cell);
    this.presenter.gridClick(event.target, rowI, cellI);
  }

  changeCellColor(cell, rowI, cellI) {
    if (this.presenter.viewModel.grid[rowI][cellI].alive) {
      cell.classList.toggle('alive', true);
    } else {
      cell.classList.toggle('alive', false);
    }
  }
}