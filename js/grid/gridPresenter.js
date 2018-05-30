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
}