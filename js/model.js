export default class Model {
  constructor(todo = []) {
    this._todo = JSON.parse(localStorage.getItem('todos')) || todo; // [{title: String, done: Boolean}]
  }

  get todo() {
    return this._todo;
  }

  addTodo(todo) {
    this._todo.push(todo);
    localStorage.setItem('todos', JSON.stringify(this._todo));
  }
  changeTodoList(data) {
    const newTodo = [];
    for (let todo of this.todo) {
      if (todo.title === data.title || todo.title === data.prevTitle) {
        if (data.type === 'change') {
          newTodo.push({title: data.title, done: data.done}); //если type='delete', элемент не будет добавлен в новый массив
        }
      } else {
      newTodo.push(todo);
      }
    }
    this._todo = newTodo;
    localStorage.setItem('todos', JSON.stringify(this._todo));
  }
}