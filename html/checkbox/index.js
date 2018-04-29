const Input = require('../input/');

class Checkbox extends Input {
    /**
     * @param {{ tag: string, id: string, className: string, type: string, name: string, disabled: boolean, required: boolean, checked: boolean }} args 
     */
    constructor({ checked = false, ...args }) {
      super({value: checked, ...args});
      this._checked = checked;
    }

    /**
     * `get` - Возвращает значение элемента.
     * 
     * `set` - Устанавливает значение элемента и сообщает слушателям о событии `change`.
     * 
     * @returns {boolean}
     */
    get checked() {
      return this._checked;
    }
    set checked(value) {
      this._checked = value;
      this.emit('change', value);
    }

    /**
     * Проверяет валидность значения
     * @returns {boolean}
     */
    get isValid() {
      return this._checked === true ? true : false;
    }
}

module.exports = Checkbox;