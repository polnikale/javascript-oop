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
    this.todoForm.addEventListener('submit', this.handleCreateNewTodo);
  
    this.todo = this.presenter.viewModel.todo;
  }

  set todo(value) {
    this._todo = value;
  }

  bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', this.handleToggleTodoItem);
    editButton.addEventListener('click', this.handleEditTodoItem);
    deleteButton.addEventListener('click', this.handleDeleteTodoItem);
  }

  addTodo(title) {
    const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
    const label = createElement('label', { className: 'title' }, title);
    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
    const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
    const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);
  
    this.bindEvents(listItem);

    this.todoList.appendChild(listItem);
  }

  reset() {
    this.addInput.value = '';
  }

  handleCreateNewTodo(event) {
    event.preventDefault();

    this.presenter.addTodo(this.addInput.value);

  }

  handleEditTodoItem(event) {
  }

  handleToggleTodoItem(event) {
    this.presenter.changeDone(event.target.parentNode);
  }

  handleDeleteTodoItem() {

  }


  
}