"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Question = /** @class */ (function () {
    function Question(text, answers, correctAnswer) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
    /**
     * Проверяет правильность ответа.
     *
     * @param {number} answer
     * @returns {boolean}
     */
    Question.prototype.isCorrectAnswer = function (answer) {
        return answer === this.correctAnswer;
    };
    return Question;
}());
exports.default = Question;
