const EventEmitter = require('../event-emitter');

class Element extends EventEmitter {
  /**
   * @param {{ tag: string, id: string, className: string }} args
   */
  constructor({ tag, id, className = '' }) {
    super();
    this.tag = tag;
    this.id = id;
    this.classList = className.split(' ') || [];
  }

  /**
   * Возвращает строку с названиями CSS классов.
   * 
   * @returns {string}
   */
  get className() {
    return this.classList.join(' ').slice(1);
  }

  /**
   * Добавляет CSS класс.
   * 
   * @param {string} className 
   */
  addClass(className) {
    if (!this.classList.includes(className)) {
      this.classList.push(className);
    }
  }

  /**
   * Удаляет CSS класс.
   * 
   * @param {string} className 
   */
  removeClass(className) {
    let index = this._elem.class.indexOf(className);
    if (index !== -1) {
      this._elem.class.splice(index, 1);
    }
  }

  /**
   * Возращает `true` или `false` в зависимости от начилия CSS класса.
   * 
   * @param {string} className
   * @returns {boolean}
   */
  hasClass(className) {
    return this._elem.class.includes(className);
  }

  /**
   * Добавляет или удаляет CSS класс в зависимости от его наличия.
   * 
   * @param {string} className 
   */
  toggleClass(className) {
    if (this._elem.class.includes(className)) {
      this.removeClass(className);
    } else {
      this.addClass(className);
    }
  }
}

module.exports = Element;