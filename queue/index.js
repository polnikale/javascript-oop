class Queue {
    constructor(...elems) {
      this._queue = elems;
    }
  
    get size() {
      return this._queue.length;
    }
  
    get isEmpty() {
      return this._queue.length === 0;
    }
  
    get front() {
      return this._queue[0];
    }
  
    get back() {
      return this._queue[this.size - 1];
    }
  
    enqueue(elem) {
      this._queue.push(elem);
    }
    dequeue() {
      return this._queue.shift(); //returns deleted element
    }
  }

module.exports = Queue;