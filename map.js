class Map {
    constructor() {
        this._store = {};
    }

    get size() {
        return this.keys().length;
    }

    get keys() {
        let keys = [];

        for (let key in this._store) {
            keys.push(key);
        }

        return keys;
    }

    get values() {
        let values = [];

        for (let key in this._store) {
            values.push(this._store[key]);
        }

        return values;
    }

    get entries() {
        let entries = [];

        for (let key in this._store) {
            entries.push([key, this._store[key]]);
        }

        return entries;
    }

    set(key, value) {
        this._store[key] = value;

        return this;
    }

    get(key) {
        return this._store[key];
    }

    has(key) {
        return key in this._store;
    }

    delete(key) {
        return delete this._store[key];
    }

    clear() {
        this._store = {};
    }

    forEach(callback) {
        for (let key in this._store) {
            let value = this._store[key];

            callback(value, key, this);
        }
    }
}