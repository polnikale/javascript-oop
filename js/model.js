export default class Model {
  constructor(todo = []) {
    this._todo = todo; // [{title: String, done: Boolean}]
  }

  get todo() {
    return this._todo;
  }

  addTodo(todo) {
    this._todo.push(todo);
  }
}