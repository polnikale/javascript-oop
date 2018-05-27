export default class View {
  constuctor(presenter) {
    this.presenter = presenter;

    this._todo = presenter.todo; // getting todos from Model

    this.addInput = null;
    this.todoForm = null;

    this.handleCreateNewTodo = this.handleCreateNewTodo.bind(this);

    console.log('created');

    this.init();
  }

  init() {
    this.addInput = document.querySelector('.add-input');
    this.todoForm = document.querySelector('#todo-form');
    console.log('akalalala');

    this.todoForm.addEventListener('submit', this.handleCreateNewTodo);
  }

  handleCreateNewTodo(event) {
    console.log('im here!');
    event.preventDefault();
    console.log('im here!');
  }
}