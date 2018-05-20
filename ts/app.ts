import { IQuestion, Question } from './question';
import { IQuiz, Quiz } from './quiz';
//@codedojo хотел транпайлить в es5, но мне почему-то ни common, ни system не поддались для экспорта/импорта, поэтому решил через esnext

//@codedojo меня очень сильно напрягают постоянные проверки на null/undefined у элементов, которые берутся из DOM. Можно ли этого как-то избежать? Или я как-то накосячил?

//@codedojo наверное displaySomething/EventHandler можно было-бы как-то вынести и преборазовать, но я не понимаю как.
interface IApp {
  displayScore(): void;
  displayProgress(): void;
  displayQuestion(): void;
  displayAnswers(): void;
  render(): void;
  clearAll(): void;
  displayNext(): void;
  restartListeners(): void;
  elems: {
    headerElem?: HTMLElement | null;
    questionElem: HTMLElement | null;
    answerElem: HTMLElement | null;
    progressElem: HTMLElement | null;
    scoreElem: HTMLElement | null;
    inputElem: HTMLInputElement | null;
    confirmBtnElem: HTMLElement | null;
  };

  quiz: IQuiz;
  chosenIndexes: number[];
  element: Element;
}


export default class App implements IApp {
  /**
   * @param {HTMLElement} element 
   * @param {Quiz} quiz 
   */
  private _element: Element;
  private _elems!: {
    headerElem?: HTMLElement | null;
    questionElem: HTMLElement | null;
    answerElem: HTMLElement | null;
    progressElem: HTMLElement | null;
    scoreElem: HTMLElement | null;
    inputElem: HTMLInputElement | null;
    confirmBtnElem: HTMLElement | null;
  }
  chosenIndexes!: number[];
  private questionNumber: number = -1;
  private _quiz: IQuiz;



  constructor(element: Element, quiz: IQuiz) {
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
  private init() {
    this._elems = {
      headerElem: document.getElementById('title'),
      questionElem: document.getElementById('question'),
      answerElem: document.getElementById('answers'),
      progressElem: document.getElementById('progress'),
      scoreElem: document.getElementById('score'),
      inputElem: document.getElementsByTagName('input')[0], //ругался, если я задаю getElementById, ибо он возвращает на инпуетелемент
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
  private handleAnswerButtonClick(event: MouseEvent): void { //отличается в зависимости от answers
    // if (!this.elems.answerElem) return; 
    // let answIndex = [...this.elems.answerElem.childNodes].indexOf(event.target);
    // if (this.quiz.checkAnswer(answIndex)) this.rightAnswers += 1;
    const question = this.quiz.currentQuestion;
    if (!question) return;
    if (!question.handleAnswerClick) {
      throw new Error('Something went wrong');
    }
    question.handleAnswerClick(this, <HTMLElement>event.target);
    this.displayNext();
  }
  private handleChooseAnswer(event: MouseEvent): void {
    const question = this.quiz.currentQuestion;
    if (!question) return;
    if(!question.handleChooseClick) {
      throw new Error('Something went wrong');
    }
    question.handleChooseClick(this, <HTMLElement>event.target);
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



  public restartListeners(): void {
    if (!this.elems.answerElem || !this.elems.confirmBtnElem) {
      throw new Error('Something went wrong');
    }
    this.elems.answerElem.removeEventListener('click', this.handleAnswerButtonClick);
    this.elems.answerElem.removeEventListener('click', this.handleChooseAnswer);
    this.elems.confirmBtnElem.removeEventListener('click', this.handleAnswerButtonClick);

    const currentQuest = this.quiz.currentQuestion;
    if (currentQuest) {
      if (currentQuest.type === 'single') {
        this.elems.answerElem.addEventListener('click', this.handleAnswerButtonClick);
      } else if (currentQuest.type === 'multiple') {
        this.elems.answerElem.addEventListener('click', this.handleChooseAnswer);
        this.elems.confirmBtnElem.addEventListener('click', this.handleAnswerButtonClick);
      } else if (currentQuest.type === 'open') {
        this.elems.confirmBtnElem.addEventListener('click', this.handleAnswerButtonClick);
      }
    }
  }

  /**
   * Отображает следующий вопрос или отображает результат если тест заверешен.
   */
  public displayNext(): void {
    if (!this.elems.answerElem || !this.elems.progressElem || !this.elems.questionElem) return;
    this.clearAll();
    this.quiz.index += 1;
    this.restartListeners();

    if (!this.quiz.hasEnded) {
      this.displayScore();
      this.quiz.index -= 1;
    } else {
      this.render();
    }
  }

  public clearAll(): void {// отличается(нужно добавлять/скрывать инпут/кнопку дальше)
    const question = this.quiz.currentQuestion;
    if (!question) return;
    if(!question.clearAll) {
      throw new Error('Something went wrong');
    }
    question.clearAll(this);
  }

  /**
   * Отображает вопрос.
   */
  public displayQuestion(): void {// остается таким же
    const question = this.quiz.currentQuestion;
    if (!question || !this.elems.questionElem) return;

    this.elems.questionElem.textContent = question.text;
  }

  public render(): void { // остается таким же
    this.displayQuestion();
    this.displayAnswers();
    this.displayProgress();
  }

  /**
   * Отображает ответы.
   */
  public displayAnswers(): void { // отличается в зависимости от question.answers
    const question = this.quiz.currentQuestion;
    if (!question || !question.displayAnswers) return; // game is over
    question.displayAnswers(this);
  }

  /**
   * Отображает прогресс ('Вопрос 1 из 5').
   */
  public displayProgress(): void {// остается таким же
    if (!this.elems.progressElem) return;
    this.elems.progressElem.textContent = `Question ${this.quiz.index+1} of ${this.quiz.maxQuestionNumber+1}...${this.quiz.rightAnswers}`;
  }

  /**
   * Отображает результат теста.
   */
  public displayScore(): void {// остается таким же
    if (!this.elems.scoreElem) return;
    this.elems.scoreElem.textContent = `У вас ${this.quiz.rightAnswers} правильных ответов из ${this.quiz.maxQuestionNumber+1}`;
  }
}

export { IApp };