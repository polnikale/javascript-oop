const List = (function() {
    const store = {};
    let id = 0;

    return class {
        constructor(...initialItems) {
            this.id = id++;

            store[this.id] = initialItems;
        }

        add(todo) {
            store[this.id].push(todo);
        }

        add(item) {
            store[this.id].push(item);
        }
        
        remove(index) {
            store[this.id].splice(index, 1);
        }
    
        get(index) {
            return store[this.id][index];
        }
        
        set(index, item) {
            store[this.id][index] = item;
        }
    };
})();