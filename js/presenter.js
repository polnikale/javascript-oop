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
    if (title === '') { // незачем добавлять 2 одинаковых туду
      this.view.reset();
      this.view.message = 'Nothing to do';
      return;
    } else if (this.hasTheSameTitle(title)) {
      this.view.reset();
      this.view.message = 'This kind of todo already exists';
      return;
    }
    this.model.addTodo({title, done: false});
    this.view.addTodo(title);
    this.view.reset();
  }

  deleteTodo(data) {
    this.model.changeTodoList({title: data.title, type: 'delete'});
    this.view.deleteTodo(data.todo);
  }

  editTodo(data) {
    this.view.reset();
    if (data.isEditing) { // нужно сохранить
      let title = data.todo.querySelector('.textfield').value;
      let prevTitle = data.todo.querySelector('.title').textContent;
      if (title === '') {
        this.view.message = 'Туду не может быть пустым';
        return;
      }
      this.view.saveEdit(data.todo);
      this.model.changeTodoList({title, prevTitle, done: data.done, type: 'change'});
    } else {
      let title = data.todo.querySelector('.title').textContent;
      if (title == '') {
        this.view.message = 'Туду не может быть пустым!';
        return;
      }
      this.view.openEdit(data.todo);
    }
  }

  changeDone(data) {
    this.view.changeCompleted({done: data.done, todo: data.todo});
    this.model.changeTodoList({title: data.title, done: data.done, type: 'change'});
  }
}