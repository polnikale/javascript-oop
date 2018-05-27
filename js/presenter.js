export default class Presenter {
  constructor(model) {
    this.model = model;
  }

  init(view) {
    this.view = view;
  }

  get viewModel() {
    return Object.freeze({
      todo: this.model.todo
    });
  }
  get todo() {
    let todo = this.model.todo;
  }

  hasTheSameTitle(title) {
    return this.viewModel.todo.find((todo) => todo.title === title) !== undefined;
  }

  addTodo(title) {
    if (title === '' || this.hasTheSameTitle(title)) { // незачем добавлять 2 одинаковых туду
      this.view.reset();
      return;
    }
    this.model.addTodo({title, done: false});
    this.view.addTodo(title);
    this.view.reset();
  }

  changeDone(data) {
    this.view.changeCompleted({done: data.done, todo: data.todo});
    this.model.changeTodo({title: data.title, done: data.done});
  }
}