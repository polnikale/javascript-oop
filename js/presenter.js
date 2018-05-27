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

  get hasTheSameTitle() {
    return this.viewModel.todo.find((elem) => elem.title === title) !== undefined;
  }

  addTodo(title) {
    if (title === '' || this.hasTheSameTitle) { // незачем добавлять 2 одинаковых туду
      this.view.reset();
      return;
    }
    this.model.addTodo({title, done: false});
    this.view.addTodo(title);
    this.view.reset();
  }

  changeDone(todoItem) {
    todoItem.classList.toggle('completed');
    const isCompleted = todItem.classList.includes('completed');
  }
}