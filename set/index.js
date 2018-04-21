class Set {
constructor(...items) {
    this._items = items;
}

get size() {
    return this._items.length;
}

get values() {
    return this._items;
}

remove(item) {
    const itemIndex = this._items.indexOf(item);
    if (itemIndex !== -1) {
    this._items.splice(itemIndex, 1);
    return true;
    } else {
    return false;
    }
}

has(item) {
    return this._items.includes(item);
}

add(item) {
    if (!this.has(item)) {
    this._items.push(item);
    }
}

clear() {
    this._items = [];
}

union(set) {
    //легче перебирать "множество", в которм меньше элементов
    let newSet;
    let neededSetValues = set.values;
    if (this.size >= neededSetValues.length) {
    newSet = new Set(...this.values);
    neededSetValues.forEach((elem) => {
        if (!this.has(elem)) {
        newSet.add(elem);
        }
    });
    } else {
    newSet = new Set(...neededSetValues);
    this.values.forEach((elem) => {
        if (!neededSetValues.includes(elem)) {
        newSet.add(elem);
        }
    });
    }
    return newSet;
}

intersection(set) {
    const newSet = new Set();
    const neededSetValues = set.values;
    if (this.size >= neededSetValues.length) {
    neededSetValues.forEach((elem) => {
        if (this.has(elem)) {
        newSet.add(elem);
        }
    });
    } else {
    this.values.forEach((elem) => {
        if (neededSetValues.includes(elem)) {
        newSet.add(elem);
        }
    });
    }
    return newSet;
}

difference(set) {
    const newSet = new Set();
    const neededSetValues = set.values;
    this.values.forEach((elem) => {
        if (!neededSetValues.includes(elem)) {
        newSet.add(elem);
        }
    });
    return newSet;
}

isSubset(set) {
    const neededSetValues = set.values;
    for (let elem of this.values) {
        if (!neededSetValues.includes(elem)) {
            return false;
        }
    }
    return true;
}

}

module.exports = Set;