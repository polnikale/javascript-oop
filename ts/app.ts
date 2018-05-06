import { IQuestion, Question } from './question';
import { IQuiz, Quiz } from './quiz';

export default class App {
  /**
   * @param {HTMLElement} element 
   * @param {Quiz} quiz 
   */
  element: HTMLElement;
  headerElem?: HTMLElement | null;
  questionElem?: HTMLElement | null;
  answerElem?: HTMLElement | null;
  progressElem?: HTMLElement | null;
  questionNumber: number = 0;
  maxQuestionNumber: number;
  quiz: IQuiz;



  constructor(element: HTMLElement, quiz: IQuiz) {
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
  handleAnswerButtonClick(event): any {
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