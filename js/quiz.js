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
    /**
     * Проверяет правильность ответа выбранного пользователем.
     * @param {*} answer
     */
    checkAnswer(answer) {
        const currQuest = this.currentQuestion;
        if (currQuest === undefined) {
            return false;
        }
        return answer === currQuest.correctAnswer;
    }
}
export { Quiz };
