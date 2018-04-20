const items = Symbol();

class List {
    constructor(...initialItems) {
        this[items] = initialItems;
    }

    get items() {
        return [...this[items]];
    }

    add(item) {
        this[items].push(item);
    }
    
    remove(index) {
        this[items].splice(index, 1);
    }

    get(index) {
        return this[items][index];
    }
    
    set(index, item) {
        this[items][index] = item;
    }
}