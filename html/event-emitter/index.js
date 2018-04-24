class EventEmitter {
    constructor() {
        this.events = {};
    }

    /**
     * Добавляет слушателя на событие.
     * 
     * @param {string} event Название события
     * @param {Function} listener Функция обработчик
     */
    on(event, listener) {
        
    }

    /**
     * Сообщает слушателям о событии.
     * 
     * @param {string} event Название события
     * @param {*} arg Данные передаваемые слушателю
     */
    emit(event, arg) {
        
    }
}

module.exports = EventEmitter;