class List {
    private items = [];

    add(item) {
        this.items.push(item);
    }
    
    remove(index) {
        this.items.splice(index, 1);
    }
    
    set(index, item) {
        this.items[index] = item;
    }
    
    get(index) {
        return this.items[index];
    }
}