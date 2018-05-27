export default class Model {
  constructor(todo = []) {
    this._todo = todo;
    console.log('akalalala');
  }

  addTodo(todo) {
    this._todo.push(todo);
  }
}