//@codedojo по-хорошему, можно было-бы поведение вынести в отдельный файл и эскпортировать его, но я уже слишком задолбался и еще дел куча, а хочу пораньше сдать. Как говориться, и так сойдет. xD
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
        return question.correctAnswer === index;
    },
    displayAnswers(app) {
        const question = app.quiz.currentQuestion;
        const answerElem = app.elems.answerElem;
        if (!question || !answerElem)
            return;
        question.answers.forEach((answer, index) => {
            let li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.id = index.toString();
            li.innerHTML = answer;
            answerElem.appendChild(li);
        });
    },
    clearAll(app) {
        if (!app.elems.answerElem || !app.elems.progressElem || !app.elems.questionElem)
            return;
        app.elems.progressElem.textContent = '';
        app.elems.questionElem.textContent = '';
        app.elems.answerElem.innerHTML = '';
        console.log('lol');
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
        question.answers.forEach((answer, index) => {
            let li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.id = index.toString();
            li.innerHTML = answer;
            answerElem.appendChild(li);
        });
        const quiz = app.element.querySelector('#quiz');
        if (!app.elems.confirmBtnElem)
            throw new Error('something went wrong');
        app.elems.confirmBtnElem.classList.remove('none');
    },
    clearAll(app) {
        if (!app.elems.answerElem || !app.elems.progressElem || !app.elems.questionElem || !app.elems.confirmBtnElem)
            return;
        app.elems.progressElem.textContent = '';
        app.elems.questionElem.textContent = '';
        app.elems.answerElem.innerHTML = '';
        app.elems.confirmBtnElem.classList.add('none');
    }
};
const withOpenBehavior = {
    handleAnswerClick(app, target) {
        if (!app.elems.inputElem)
            return;
        let answ = app.elems.inputElem.value;
        let quest = app.quiz.currentQuestion;
        if (!quest)
            throw new Error('something went wrong!');
        if (this.checkAnswer(quest, answ))
            app.rightAnswers += 1;
    },
    checkAnswer(question, answ) {
        if (typeof question.correctAnswer !== 'string') {
            throw new Error('something went wrong!');
        }
        else {
            return question.correctAnswer.toUpperCase() == answ.toUpperCase();
        }
    },
    displayAnswers(app) {
        if (!app.elems.confirmBtnElem || !app.elems.inputElem)
            throw new Error('something went wrong');
        app.elems.confirmBtnElem.classList.remove('none');
        app.elems.inputElem.classList.remove('none');
    },
    clearAll(app) {
        if (!app.elems.progressElem || !app.elems.questionElem || !app.elems.confirmBtnElem || !app.elems.inputElem)
            return;
        app.elems.progressElem.textContent = '';
        app.elems.questionElem.textContent = '';
        app.elems.inputElem.value = '';
        app.elems.confirmBtnElem.classList.add('none');
        app.elems.inputElem.classList.add('none');
    },
};
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
