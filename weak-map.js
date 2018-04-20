const List = (function() {
    const store = new WeakMap();

    return class {
        constructor(...initialItems) {
            store.set(this, initialItems);
        }

        add(todo) {
            store.get(this).push(todo);
        }

        add(item) {
            store.get(this).push(item);
        }
        
        remove(index) {
            store.get(this).splice(index, 1);
        }
    
        get(index) {
            return store.get(this)[index];
        }
        
        set(index, item) {
            store.get(this)[index] = item;
        }
    };
})();