class Stack {
    constructor(...elems) {
      this._stack = elems;
    }
  
    get size() {
      return this._stack.length;
    }
  
    get isEmpty() {
      return this.size === 0;
    }
  
    push(elem) {
      this._stack.push(elem);
    }
  
    pop() {
      return this._stack.pop();
    } 
    peek() {
      return this._stack[this.size - 1];
    }
  }

module.exports = Stack;