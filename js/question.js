const withSingleBehavior = {
    handleAnswerClick(app, target) {
        if (!app.elems.answerElem)
            return;
        let answIndex = [...app.elems.answerElem.childNodes].indexOf(target);
        if (app.quiz.checkAnswer(answIndex))
            app.rightAnswers += 1;
    }
};
const withMultipleBehavior = {
    handleAnswerClick(app, target) {
        if (!app.elems.answerElem)
            return;
        let answIndex = [...app.elems.answerElem.childNodes].indexOf(target);
        if (app.quiz.checkAnswer(answIndex))
            app.rightAnswers += 1;
    }
};
const withOpenBehavior = {};
class Question {
    constructor(text, type, answers = [], correctAnswer) {
        this.text = text;
        this.type = type;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
    /**
     * Проверяет правильность ответа.
     *
     * @param {number} answer
     * @returns {boolean}
     */
    isCorrectAnswer(answer) {
        return answer === this.correctAnswer;
    }
}
export { Question, withSingleBehavior, withOpenBehavior, withMultipleBehavior };
