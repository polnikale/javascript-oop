class Set {
    /**
     * Создает сет, опционально принимая элементы для добавления
     * @param {...*} [items]
     */
    constructor() {
        
    }

    /**
     * Возвращает количество элементов
     * @returns {number}
     */
    get size() {
        
    }

    /**
     * Возвращает массив элементов
     * @returns {Array}
     */
    get values() {
        
    }

    /**
     * Добавляет элемент
     * @param {*} item
     */
    add() {
        
    }

    /**
     * Проверяет наличие элемента
     * @param {*} item
     * @returns {boolean}
     */
    has() {
        
    }

    /**
     * Удаляет элемент из сета и возвращает `true` если элемент удален и `false` если нет
     * @param {*} item
     * @returns {boolean}
     */
    remove() {
        
    }

    /**
     * Удаляет все элементы
     */
    clear() {
        
    }

    /**
     * Возращает сет состоящий из элементов двух сетов
     * @param {Set} set
     * @returns {Set}
     */
    union() {
        
    }

    /**
     * Возращает сет состоящий из элементов которые присутствуют в обоих сетах
     * @param {Set} set
     * @returns {Set}
     */
    intersection() {
        
    }

    /**
     * Возращает сет состоящий из элементов присутствующих в первом сете, и отсутствующих во втором
     * @param {Set} set
     * @returns {Set}
     */
    difference() {
        
    }

    /**
     * Возвращает `true` если сет содержит в себе все элементы из друого сета
     * @param {Set} set
     * @returns {boolean}
     */
    isSubset() {
        
    }
}

module.exports = Set;