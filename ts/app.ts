import { IQuestion, Question } from './question';
import { IQuiz, Quiz } from './quiz';

//@codedojo хотел транпайлить в es5, но мне почему-то ни common, ни system не поддались для экспорта/импорта, поэтому решил через esnext

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
  scoreElem?: HTMLElement | null;
  questionNumber: number = -1;
  rightAnswers: number = 0;
  maxQuestionNumber: number;
  quiz: IQuiz;



  constructor(element: HTMLElement, quiz: IQuiz) {
    this.element = element;
    this.quiz = quiz;
    this.maxQuestionNumber = quiz.questions.length-1;
    this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
    this.init();
  }

  /**
   * Инициализирует объект.
   * 
   * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие при выборе ответа.
   */
  private init() {
    this.headerElem = this.element.querySelector('h1'),
      this.questionElem = document.getElementById('question'),
      this.answerElem = document.getElementById('answers'),
      this.progressElem = document.getElementById('progress');
      this.scoreElem = document.getElementById('score');
    if (!this.headerElem || !this.questionElem || !this.answerElem || !this.progressElem) {
      throw new ReferenceError('Something is null!');
    } 
    this.headerElem.textContent = this.quiz.title;
    this.answerElem.addEventListener('click', this.handleAnswerButtonClick);
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
  private handleAnswerButtonClick(event: any): void { //пришлось задавать ени, ибо TS не понимает, почему this.handleAnswerButtonClick без аргументов
    if (!this.answerElem) return;
    let answIndex = [...this.answerElem.childNodes].indexOf(event.target);
    if (this.quiz.checkAnswer(answIndex)) this.rightAnswers += 1;
    this.displayNext();
  }

  /**
   * Отображает следующий вопрос или отображает результат если тест заверешен.
   */
  public displayNext(): void {
    if (!this.answerElem || !this.progressElem || !this.questionElem) return;
    this.clearAll();
    if (this.questionNumber + 1 <= this.maxQuestionNumber) {
      this.quiz.index += 1;
      this.questionNumber += 1;
      this.render();
    } else {
      this.displayScore();
      this.answerElem.removeEventListener('click', this.handleAnswerButtonClick);
    }
  }

  public clearAll() {
    if (!this.answerElem || !this.progressElem || !this.questionElem) return;
    this.progressElem.textContent = '';
    this.questionElem.textContent = '';
    this.answerElem.innerHTML = '';
  }

  /**
   * Отображает вопрос.
   */
  public displayQuestion(): void {
    const question = this.quiz.currentQuestion;
    if (!question || !this.questionElem) return;

    this.questionElem.textContent = question.text;
  }

  public render(): void {
    console.log(this.quiz.currentQuestion);
    this.displayQuestion();
    this.displayAnswers();
    this.displayProgress();
  }

  /**
   * Отображает ответы.
   */
  public displayAnswers(): void {
    const question = this.quiz.currentQuestion;
    const answerElem = this.answerElem;
    if (!question || !answerElem) return;
    answerElem.innerHTML = '';

    question.answers.forEach((answer: string, index: number) => {
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
  public displayProgress(): void {
    if (!this.progressElem) return;
    this.progressElem.textContent = `Question ${this.questionNumber+1} of ${this.maxQuestionNumber+1}`;
  }

  /**
   * Отображает результат теста.
   */
  public displayScore(): void {
    if (!this.scoreElem) return;
    this.scoreElem.textContent = `У вас ${this.rightAnswers} правильных ответов из ${this.maxQuestionNumber+1}`;
  }
}