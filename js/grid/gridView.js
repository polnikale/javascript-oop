export default class GrdiView {
  constructor(presenter) {
    this.presenter = presenter;
    this.gridElement = document.querySelector('#grid');
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
  }
}