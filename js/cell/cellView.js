export default class CellView {
  constructor(presenter) {
    this.presenter = presenter;

    this.init();
  }

  init() {

  }

  createCell(where = document.body) {
    const tr = document.createElement('tr');
    tr.classList.toggle('alive', this.presenter.viewModel.alive);
  }
}