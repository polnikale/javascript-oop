export default class GridPresenter {
  constructor(model) {
    this.model = model;
  }

  init(view) {
    this.view = view;
  }

  get viewModel() {
    return Object.freeze({
      size: this.model.size,
      grid: this.model.grid
    });
  }

  gridClick(cell, rowI, cellI) {
    if (this.model.grid[rowI][cellI].alive) {
      this.model.grid[rowI][cellI].alive = false;
    } else {
      this.model.grid[rowI][cellI].alive = true;
    }
    this.view.changeCellColor(cell, rowI, cellI);
  }
}