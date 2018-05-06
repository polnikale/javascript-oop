export default class App {
    constructor(element, quiz) {
        this.questionNumber = 0;
        this.element = element;
        this.quiz = quiz;
        this.maxQuestionNumber = quiz.questions.length;
        this.init();
    }
    /**
     * Инициализирует объект.
     *
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие при выборе ответа.
     */
    init() {
        this.headerElem = this.element.querySelector('h1'),
            this.questionElem = this.element.querySelector('h3'),
            this.answerElem = document.getElementById('answers'),
            this.progressElem = document.getElementById('progress');
        if (!this.headerElem || !this.questionElem || !this.answerElem || !this.progressElem) {
            throw new ReferenceError('Something is null!');
        }
        this.headerElem.textContent = 'JS QUIZ!!!';
        this.answerElem.addEventListener('click', this.handleAnswerButtonClick.bind(this));
    }
    /**
     * Обрабатывает событие при выборе ответа.
     *
     * @param {Event} event
     */
    handleAnswerButtonClick(event) {
        this.questionNumber += 1;
    }
    /**
     * Отображает следующий вопрос или отображает результат если тест заверешен.
     */
    displayNext() {
    }
    /**
     * Отображает вопрос.
     */
    displayQuestion() {
    }
    /**
     * Отображает ответы.
     */
    displayAnswers() {
    }
    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    displayProgress() {
    }
    /**
     * Отображает результат теста.
     */
    displayScore() {
    }
}
