"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Quiz = /** @class */ (function () {
    function Quiz(title, questions) {
        this.title = title;
        this.questions = questions;
    }
    Object.defineProperty(Quiz.prototype, "currentQuestion", {
        /**
         * Возвращает текущий вопрос.
         *
         * @returns {Question}
         */
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quiz.prototype, "hasEnded", {
        /**
         * Возвращает `true/false` в зависимости от того закончился тест или нет.
         *
         * @returns {boolean}
         */
        get: function () {
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Проверяет правильность ответа выбранного пользователем.
     * @param {*} answer
     */
    Quiz.prototype.checkAnswer = function (answer) {
    };
    return Quiz;
}());
exports.default = Quiz;
