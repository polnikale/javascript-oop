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
  }

}