const withSingleBehavior = {
    handleAnswerClick(app, target) {
        if (!app.elems.answerElem)
            return;
        let answIndex = [...app.elems.answerElem.childNodes].indexOf(target);
        let quest = app.quiz.currentQuestion;
        if (!quest)
            throw new Error('something went wrong!');
        if (this.checkAnswer(quest, answIndex))
            app.rightAnswers += 1;
    },
    checkAnswer(question, index) {
    },
    displayAnswers(app) {
        const question = app.quiz.currentQuestion;
        const answerElem = app.elems.answerElem;
        if (!question || !answerElem)
            return;
        answerElem.innerHTML = '';
        question.answers.forEach((answer, index) => {
            let li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.id = index.toString();
            li.innerHTML = answer;
            answerElem.appendChild(li);
        });
    }
};
const withMultipleBehavior = {
    handleAnswerClick(app, target) {
        let quest = app.quiz.currentQuestion;
        if (!quest)
            throw new Error('something went wrong!');
        if (this.checkAnswer(quest, app.chosenIndexes))
            app.rightAnswers += 1;
    },
    checkAnswer(question, indexes) {
        let elemsHaveEqualElems = true;
        if (!Array.isArray(question.correctAnswer)) {
            throw new Error('something went wrong');
        }
        indexes.forEach((elem) => {
            if (!Array.isArray(question.correctAnswer)) {
                throw new Error('something went wrong');
            } //@codedojo почему-то в forEach-e TS забывает о том, что question уже только number[]
            if (!question.correctAnswer.includes(elem)) {
                elemsHaveEqualElems = false;
            }
        });
        return elemsHaveEqualElems && (indexes.length === question.correctAnswer.length);
    },
    handleChooseClick(app, target) {
        const id = Number(target.id) + 1;
        const elemIndex = app.chosenIndexes.indexOf(id);
        if (elemIndex === -1) {
            app.chosenIndexes.push(id);
            target.classList.add('active');
        }
        else {
            app.chosenIndexes.splice(elemIndex, 1);
            target.classList.remove('active');
        }
        console.log(app.chosenIndexes);
    },
    displayAnswers(app) {
        const question = app.quiz.currentQuestion;
        const answerElem = app.elems.answerElem;
        if (!question || !answerElem)
            return;
        answerElem.innerHTML = '';
        question.answers.forEach((answer, index) => {
            let li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.id = index.toString();
            li.innerHTML = answer;
            answerElem.appendChild(li);
        });
        const quiz = app.element.querySelector('#quiz');
        if (!quiz)
            throw new Error('something went wrong');
        quiz.insertBefore(app.elems.confirmBtnElem, app.elems.progressElem);
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
