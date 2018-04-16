class Inventory {
    constructor() {
        this._items = [];
    }

    put(item) {
        this._items.push(item);
    }

    take(item) {
        if (!this.has(item)) return null;

        let returnedItem = this._items.find(i => i === item);
        this._items = this._items.filter(i => i !== item);

        return returnedItem;
    }

    has(item) {
        return this._items.includes(item);
    }

    clear() {
        this._items = [];
    }
}

class Character {    
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.inventory = new Inventory(); // Character has Inventory
    }

    greet(character) {
        console.log(`Приветствую ${character.name}! Меня зовут ${this.name}`);
    }
}

class Warrior extends Character { // Warrior is Character
    constructor(name, weapon) {
        super(name);

        this.weapon = weapon;
        this.stamina = 100;
    }
}

class Wizard extends Character { // Wizard is Character
    constructor(name) {
        super(name);

        this.spell = spell;
        this.mana = 100;
    }
}

let character = new Character('Джо');
let warrior = new Warrior('Арутр', 'Экскалибур');
let wizard = new Wizard('Мерлин', 'Близард');