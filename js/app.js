"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App = /** @class */ (function () {
    /**
     * @param {HTMLElement} element
     * @param {Quiz} quiz
     */
    function App(element, quiz) {
    }
    /**
     * Инициализирует объект.
     *
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие при выборе ответа.
     */
    App.prototype.init = function () {
    };
    /**
     * Обрабатывает событие при выборе ответа.
     *
     * @param {Event} event
     */
    App.prototype.handleAnswerButtonClick = function (event) {
    };
    /**
     * Отображает следующий вопрос или отображает результат если тест заверешен.
     */
    App.prototype.displayNext = function () {
    };
    /**
     * Отображает вопрос.
     */
    App.prototype.displayQuestion = function () {
    };
    /**
     * Отображает ответы.
     */
    App.prototype.displayAnswers = function () {
    };
    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    App.prototype.displayProgress = function () {
    };
    /**
     * Отображает результат теста.
     */
    App.prototype.displayScore = function () {
    };
    return App;
}());
exports.default = App;
