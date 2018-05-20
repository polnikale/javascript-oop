export default class App {
    constructor(element, quiz) {
        this.questionNumber = -1;
        this._element = element;
        this._quiz = quiz;
        this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
        this.handleChooseAnswer = this.handleChooseAnswer.bind(this);
        this.init();
    }
    /**
     * Инициализирует объект.
     *
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие при выборе ответа.
     */
    init() {
        this._elems = {
            headerElem: document.getElementById('title'),
            questionElem: document.getElementById('question'),
            answerElem: document.getElementById('answers'),
            progressElem: document.getElementById('progress'),
            scoreElem: document.getElementById('score'),
            inputElem: document.getElementsByTagName('input')[0],
            confirmBtnElem: document.getElementById('btn-answer'),
        };
        if (!this.elems.headerElem || !this.elems.answerElem) {
            throw new ReferenceError('Something is null!');
        }
        this.elems.headerElem.textContent = this.quiz.title;
        this.chosenIndexes = [];
        /**@codedojo возник вопрос. Очевидно, тут некоторые элементы могут быть null/undefined. Я в init сделал проверку на то, что они не falsy.
         * Но тайпскрипт не понял, что они дальше уже буду не null(именно в функциях) и надо выполпять дополнительную проверку(пример тот же displayQuestion). Это я где-то налажал, или как?
         * UPD: узнал о !, но элемент же может быть null, если его нет. Но при этом постоянные проверки выбешивают...
         * */
    }
    /**
     * Обрабатывает событие при выборе ответа.
     *
     * @param {Event} event
     */
    handleAnswerButtonClick(event) {
        // if (!this.elems.answerElem) return; 
        // let answIndex = [...this.elems.answerElem.childNodes].indexOf(event.target);
        // if (this.quiz.checkAnswer(answIndex)) this.rightAnswers += 1;
        const question = this.quiz.currentQuestion;
        if (!question)
            return;
        if (!question.handleAnswerClick) {
            throw new Error('Something went wrong');
        }
        question.handleAnswerClick(this, event.target);
        this.displayNext();
    }
    handleChooseAnswer(event) {
        const question = this.quiz.currentQuestion;
        if (!question)
            return;
        if (!question.handleChooseClick) {
            throw new Error('Something went wrong');
        }
        question.handleChooseClick(this, event.target);
    }
    get elems() {
        return this._elems;
    }
    set elems(value) {
        this._elems = value;
    }
    get quiz() {
        return this._quiz;
    }
    set quiz(value) {
        this.quiz = value;
    }
    get element() {
        return this._element;
    }
    set element(value) {
        this._element = value;
    }
    restartListeners() {
        if (!this.elems.answerElem || !this.elems.confirmBtnElem) {
            throw new Error('Something went wrong');
        }
        this.elems.answerElem.removeEventListener('click', this.handleAnswerButtonClick);
        this.elems.answerElem.removeEventListener('click', this.handleChooseAnswer);
        this.elems.confirmBtnElem.removeEventListener('click', this.handleAnswerButtonClick);
        const currentQuest = this.quiz.currentQuestion;
        if (currentQuest) {
            if (!this.quiz.currentQuestion || !this.quiz.currentQuestion.setHandler)
                return;
            this.quiz.currentQuestion.setHandler(this);
        }
    }
    /**
     * Отображает следующий вопрос или отображает результат если тест заверешен.
     */
    displayNext() {
        if (!this.elems.answerElem || !this.elems.progressElem || !this.elems.questionElem)
            return;
        this.clearAll();
        this.quiz.index += 1;
        this.restartListeners();
        if (!this.quiz.hasEnded) {
            this.displayScore();
            this.quiz.index -= 1;
        }
        else {
            this.render();
        }
    }
    clearAll() {
        const question = this.quiz.currentQuestion;
        if (!question)
            return;
        if (!question.clearAll) {
            throw new Error('Something went wrong');
        }
        question.clearAll(this);
    }
    /**
     * Отображает вопрос.
     */
    displayQuestion() {
        const question = this.quiz.currentQuestion;
        if (!question || !this.elems.questionElem)
            return;
        this.elems.questionElem.textContent = question.text;
    }
    render() {
        this.displayQuestion();
        this.displayAnswers();
        this.displayProgress();
    }
    /**
     * Отображает ответы.
     */
    displayAnswers() {
        const question = this.quiz.currentQuestion;
        if (!question || !question.displayAnswers)
            return; // game is over
        question.displayAnswers(this);
    }
    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    displayProgress() {
        if (!this.elems.progressElem)
            return;
        this.elems.progressElem.textContent = `Question ${this.quiz.index + 1} of ${this.quiz.maxQuestionNumber + 1}...${this.quiz.rightAnswers}`;
    }
    /**
     * Отображает результат теста.
     */
    displayScore() {
        if (!this.elems.scoreElem)
            return;
        this.elems.scoreElem.textContent = `У вас ${this.quiz.rightAnswers} правильных ответов из ${this.quiz.maxQuestionNumber + 1}`;
    }
}
