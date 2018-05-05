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
            for (var _i = 0, _a = this.questions; _i < _a.length; _i++) {
                var question = _a[_i];
                if (question.text === this.title)
                    return question;
            }
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
            return this.currentQuestion !== null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Проверяет правильность ответа выбранного пользователем.
     * @param {*} answer
     */
    Quiz.prototype.checkAnswer = function (answer) {
        var currQuest = this.currentQuestion;
        return answer === currQuest.answers[currQuest.correctAnswer];
    };
    return Quiz;
}());
exports.Quiz = Quiz;
