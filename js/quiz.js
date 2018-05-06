class Quiz {
    constructor(title, questions) {
        this.title = title;
        this.questions = questions;
    }
    /**
     * Возвращает текущий вопрос.
     *
     * @returns {Question}
     */
    get currentQuestion() {
        for (let question of this.questions) {
            if (question.text === this.title)
                return question;
        }
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
        if (this.currentQuestion === undefined) {
            return false;
        }
        const currQuest = this.currentQuestion;
        return answer === currQuest.correctAnswer;
    }
}
export { Quiz };
