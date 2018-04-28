const EventEmitter = require('../event-emitter');

class Element extends EventEmitter {
  /**
   * @param {{ tag: string, id: string, className: string }} args
   */
  constructor({ tag, id, className = '' }) {
    super();
    this.tag = tag;
    this.id = id;
    this._className = className.split(' ');
  }

  /**
   * Возвращает строку с названиями CSS классов.
   * 
   * @returns {string}
   */
  get className() {
    return this._className.join(' ').trim();
  }

  /**
   * Добавляет CSS класс.
   * 
   * @param {string} className 
   */
  addClass(className) {
    if (!this._className.includes(className)) {
      this._className.push(className);
    }
  }

  /**
   * Удаляет CSS класс.
   * 
   * @param {string} className 
   */
  removeClass(className) {
    let index = this.className.indexOf(className);
    if (index !== -1) {
      this.className.splice(index, 1);
    }
  }

  /**
   * Возращает `true` или `false` в зависимости от начилия CSS класса.
   * 
   * @param {string} className
   * @returns {boolean}
   */
  hasClass(className) {
    return this._className.includes(className);
  }

  /**
   * Добавляет или удаляет CSS класс в зависимости от его наличия.
   * 
   * @param {string} className 
   */
  toggleClass(className) {
    if (this._className.includes(className)) {
      let index = this._className.indexOf(className);
      this._className.splice(index,1);
    } else {
      this._className.push(className);
    }
  }
}

module.exports = Element;