class Quiz {
    constructor(title, questions) {
        this.index = -1;
        this.title = title;
        this.questions = questions;
    }
    /**
     * Возвращает текущий вопрос.
     *
     * @returns {Question}
     */
    get currentQuestion() {
        if (this.index < this.questions.length)
            return this.questions[this.index];
        return undefined;
    }
    /**
     * Возвращает `true/false` в зависимости от того закончился тест или нет.
     *
     * @returns {boolean}
     */
    get hasEnded() {
        return this.currentQuestion !== null;
    }
}
export { Quiz };
