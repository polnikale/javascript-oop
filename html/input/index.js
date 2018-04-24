const Element = require('../element');

class Input extends Element {
    /**
     * @param {{ tag: string, id: string, className: string, type: string, name: string, disabled: boolean, required: boolean }} args 
     */
    constructor({ type = 'text', name, value, disabled = false, required = false, ...args }) {
        
    }

    /**
     * `get` - Возвращает значение элемента.
     * 
     * `set` - Устанавливает значение элемента и сообщает слушателям о событии `change`.
     * 
     * @returns {boolean}
     */
    get value() {  }
    set value(value) {
        
    }

    /**
     * Проверяет валидность значения.
     * 
     * Если элемент отмечен как `required`, то значение не должно быть `undefined`
     * 
     * @returns {boolean}
     */
    get isValid() {
        
    }
}

module.exports = Input;