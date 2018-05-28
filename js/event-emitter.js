export default class EventEmitter {
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
    this.events[event] = this.events[event] || [];
    this.events[event].push(listener);
  }

  /**
   * Сообщает слушателям о событии.
   * 
   * @param {string} event Название события
   * @param {*} arg Данные передаваемые слушателю
   */
  emit(event, arg) {
    let myEvent = this.events[event] || [];
    myEvent.forEach((listener) => {
      listener(arg);
    })
  }
}