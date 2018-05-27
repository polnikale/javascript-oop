export default class Presenter {
  constructor(model) {
    this.model = model;
  }

  init(view) {
    this.view = view;
  }

  get todo() {
    let todo = this.model.todo;
  }
}