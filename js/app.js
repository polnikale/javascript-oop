export default class App {
    constructor(element, quiz) {
        this.questionNumber = 0;
        this.rightAnswers = 0;
        this.element = element;
        this.quiz = quiz;
        this.maxQuestionNumber = quiz.questions.length - 1;
        this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
        this.init();
    }
    /**
     * Инициализирует объект.
     *
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие при выборе ответа.
     */
    init() {
        this.elems = {
            headerElem: this.element.querySelector('h1'),
            questionElem: document.getElementById('question'),
            answerElem: document.getElementById('answers'),
            progressElem: document.getElementById('progress'),
            scoreElem: document.getElementById('score'),
            inputElem: document.createElement('input'),
            confirmBtnElem: document.createElement('button'),
        };
        this.elems.confirmBtnElem.className = 'btn-success';
        this.elems.inputElem.setAttribute('type', 'text');
        this.elems.inputElem.className = 'form-control';
        if (!this.elems.headerElem || !this.elems.answerElem) {
            throw new ReferenceError('Something is null!');
        }
        this.elems.headerElem.textContent = this.quiz.title;
        this.elems.answerElem.addEventListener('click', this.handleAnswerButtonClick);
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
        question.handleAnswerClick(this, event.target);
        this.displayNext();
    }
    /**
     * Отображает следующий вопрос или отображает результат если тест заверешен.
     */
    displayNext() {
        if (!this.elems.answerElem || !this.elems.progressElem || !this.elems.questionElem)
            return;
        this.clearAll();
        if (this.questionNumber <= this.maxQuestionNumber) {
            this.quiz.index += 1;
            this.questionNumber += 1;
            this.render();
        }
        else {
            this.displayScore();
            this.elems.answerElem.removeEventListener('click', this.handleAnswerButtonClick);
        }
    }
    clearAll() {
        if (!this.elems.answerElem || !this.elems.progressElem || !this.elems.questionElem)
            return;
        this.elems.progressElem.textContent = '';
        this.elems.questionElem.textContent = '';
        this.elems.answerElem.innerHTML = '';
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
        const answerElem = this.elems.answerElem;
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
    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    displayProgress() {
        if (!this.elems.progressElem)
            return;
        this.elems.progressElem.textContent = `Question ${this.questionNumber} of ${this.maxQuestionNumber + 1}`;
    }
    /**
     * Отображает результат теста.
     */
    displayScore() {
        if (!this.elems.scoreElem)
            return;
        this.elems.scoreElem.textContent = `У вас ${this.rightAnswers} правильных ответов из ${this.maxQuestionNumber + 1}`;
    }
}
