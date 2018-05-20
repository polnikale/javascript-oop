class Quiz {
    constructor(title, questions) {
        this._index = -1;
        this.title = title;
        this.questions = questions;
        this._maxQuestionNumber = questions.length - 1;
        this._rightAnswers = 0;
    }
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
    }
    get maxQuestionNumber() {
        return this._maxQuestionNumber;
    }
    get rightAnswers() {
        return this._rightAnswers;
    }
    set rightAnswers(value) {
        this._rightAnswers = value;
    }
    /**
     * Возвращает текущий вопрос.
     *
     * @returns {Question}
     */
    get currentQuestion() {
        return this.questions[this.index];
    }
    /**
     * Возвращает `true/false` в зависимости от того закончился тест или нет.
     *
     * @returns {boolean}
     */
    get hasEnded() {
        return this.currentQuestion !== undefined;
    }
}
export { Quiz };
