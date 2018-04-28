const Element = require('../element');

class Input extends Element {
  /**
   * @param {{ tag: string, id: string, className: string, type: string, name: string, disabled: boolean, required: boolean }} args 
   */
  constructor({ type = 'text', name, value, disabled = false, required = false, ...args }) {
    super({tag: 'input', ...args});
    this.type = type;
    this.name = name;
    this._value = value;
    this.disabled = disabled;
    this.required = required;
  }

  /**
   * `get` - Возвращает значение элемента.
   * 
   * `set` - Устанавливает значение элемента и сообщает слушателям о событии `change`.
   * 
   * @returns {boolean}
   */
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }

  /**
   * Проверяет валидность значения.
   * 
   * Если элемент отмечен как `required`, то значение не должно быть `undefined`
   * 
   * @returns {boolean}
   */
  get isValid() {
    if (this.required) {
      return this._elem === undefined;
    }
    return true;
  }
}

module.exports = Input;