class List {
    constructor() {
        const items = [];

        this.add = item => items.push(item);

        this.remove = index => this[items].splice(index, 1);
        
        this.get = index => this[items][index];
        
        this.set = (index, item) => this[items][index] = item;

        Object.defineProperty(this, 'item', {
            get: () => [...items]
        });
    }
}