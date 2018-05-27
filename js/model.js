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
  changeTodoList(data) {
    const newTodo = [];
    for (let todo of this.todo) {
      if (todo.title === data.title) {
        if (data.type === 'change') {
          newTodo.push({title: data.title, done: data.done}); //если type='delete', элемент не будет добавлен в новый массив
        }
      } else {
      newTodo.push(todo);
      }
    }
    this._todo = newTodo;
    console.log(this.todo);
  }
}