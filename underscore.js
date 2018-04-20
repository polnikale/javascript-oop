class List {
    constructor(...initialItems) {
        this._items = initialItems;
    }

    get items() {
        return [...this._items];
    }

    add(item) {
        this._items.push(item);
    }
    
    remove(index) {
        this._items.splice(index, 1);
    }

    get(index) {
        return this._items[index];
    }
    
    set(index, item) {
        this._items[index] = item;
    }
}