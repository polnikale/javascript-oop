export default class Tab {
  /**
   * Создает вкладку.
   * @param { element: HTMLElement} args
   */
  constructor({element, onActivate = () => {}}) {
      this._elem = element;
      this._active = false;
      this._callback = onActivate;
      this.init();
  }

  /**
   * Инициализирует объект.
   * Устанавливает свойство акивности вкладки.
   * Устанавливает обработчик для обработки нажатия на элемент.
   * @private
   */
  init() {
    this._active = this._elem.classList.contains('active');
    this._elem.addEventListener('click', this.handleClick.bind(this));
  }

  /**
   * Возвращает HTML элемент.
   * @returns {HTMLElement}
   */
  get element() { 
    return this._elem;
  }

  /**
   * Возвращает ID вкладки.
   * ID вкладки берется из атрибута `hash` у элемента (`#panel-1` => `panel-1`)
   * @returns {string}
   */
  get id() { 
    let indexOfHash = this._elem.hash.indexOf('#');
    return this._elem.hash.substring(indexOfHash+1);
  }

  /**
   * `get` - Возвращает `true` или `false` в зависимости от того активна вкладка или нет.
   * 
   * `set` - Устанавливает активность вкладки, добавляя или удаляя соответствующий класс
   * @returns {boolean}
   */
  get isActive() { 
    return this._active;
  }
  set isActive(makeTabActive) {
    this._elem.classList.toggle('active', makeTabActive);
    console.log(this._elem.classList);
    this._active = this._elem.classList.contains('active');
  }

  set clickHandler(callback) {
    this._callback = callback;
  }

  /**
   * Вызывается при нажатии на вкладку.
   * 
   * Устанавливает активность вкладки.
   * Вызывает функцию обратно вызова, отправляя туда ссылку на текущий объект, т.е. саму вкладку.
   * @private
   * @param {Event} event 
   */
  handleClick(event) {
    this.isActive = true;
    this._callback(this);
  }
}