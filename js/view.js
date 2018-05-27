import { createElement } from './dom.js';

export default class View {
  constructor(presenter) {
    this.presenter = presenter;

    this.handleCreateNewTodo = this.handleCreateNewTodo.bind(this);
    this.handleToggleTodoItem = this.handleToggleTodoItem.bind(this);
    this.handleEditTodoItem = this.handleEditTodoItem.bind(this);
    this.handleDeleteTodoItem = this.handleDeleteTodoItem.bind(this);
  
    this.init();
  }

  init() {
    this.addInput = document.querySelector('#add-input');
    this.todoList = document.querySelector('ul');
    this.todoForm = document.querySelector('#todo-form');
    this._message = document.querySelector('#message');
    this.todoForm.addEventListener('submit', this.handleCreateNewTodo);
  
    this.todo = this.presenter.viewModel.todo;
    this.createTodos();
  }

  set todo(value) {
    this._todo = value;
  }
  
  set message(value) {
    this._message.textContent = value;
  }

  handleCreateNewTodo(event) {
    event.preventDefault();

    this.presenter.addTodo(this.addInput.value);

  }

  handleEditTodoItem(event) {
    const todo = event.target.parentNode;
    const isEditing = todo.classList.contains('editing');
    // @codedojo тут у меня вопрос. Как и в последующих. Стоит ли мне в presenter кидать дополнительную инфу, по типу title, done, isEditing и так далее?
    const done = todo.classList.contains('completed');
    this.presenter.editTodo({todo, isEditing, done});
  }

  handleToggleTodoItem(event) {
    const todo = event.target.parentNode;
    const done = !(todo.classList.contains('completed'));
    const title = todo.querySelector('label').textContent;
    this.presenter.changeDone({todo, done, title});
  }

  handleDeleteTodoItem(event) {
    const todo = event.target.parentNode;
    const title = todo.querySelector('label').textContent;
    this.presenter.deleteTodo({todo, title});
  }

  createTodos() {
    this._todo.forEach((todo) => {
      this.addTodo(todo);
    });
  }

  
  bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', this.handleToggleTodoItem);
    editButton.addEventListener('click', this.handleEditTodoItem);
    deleteButton.addEventListener('click', this.handleDeleteTodoItem);
  }

  addTodo({title, done = false}) {
    let listClass;
    if (done) {
      listClass = 'todo-item completed';
    } else {
      listClass = 'todo-item';
    }
    const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
    const label = createElement('label', { className: 'title' }, title);
    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
    const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
    const listItem = createElement('li', { className: listClass }, checkbox, label, editInput, editButton, deleteButton);
  
    this.bindEvents(listItem);

    this.todoList.appendChild(listItem);
  }

  deleteTodo(todo) {
    this.todoList.removeChild(todo);
  }

  saveEdit(todo) {
    const title = todo.querySelector('.title');
    const editInput = todo.querySelector('.textfield');
    title.innerText = editInput.value;
    todo.querySelector('.edit').textContent = 'Изменить';
    todo.classList.toggle('editing', false);
  }

  openEdit(todo) {
    const title = todo.querySelector('.title');
    const editInput = todo.querySelector('.textfield');
    editInput.value = title.innerText;
    todo.querySelector('.edit').textContent = 'Сохранить';
    todo.classList.toggle('editing', true);
  }

  reset() {
    this.addInput.value = '';
    this._message.textContent = '';
  }

  changeCompleted(data) {
    data.todo.classList.toggle('completed', data.done)
  }


  
}