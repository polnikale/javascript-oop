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
  changeTodo(data) {
    this._todo = this.todo.map((todo) => {
      if (todo.title === data.title) {
        return data;
      }
      return todo;
    });
    console.log(this.todo);
  }
}