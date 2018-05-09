import { IQuestion, Question } from './question';
import { IQuiz, Quiz } from './quiz';
//@codedojo хотел транпайлить в es5, но мне почему-то ни common, ни system не поддались для экспорта/импорта, поэтому решил через esnext

//@codedojo меня очень сильно напрягают постоянные проверки на null/undefined у элементов, которые берутся из DOM. Можно ли этого как-то избежать? Или я как-то накосячил?

//@codedojo наверное displaySomething/EventHandler можно было-бы как-то вынести и преборазовать, но я не понимаю как.
interface IApp {
  element: Element;
  elems: {
    headerElem?: HTMLElement | null;
    questionElem: HTMLElement | null;
    answerElem: HTMLElement | null;
    progressElem: HTMLElement | null;
    scoreElem: HTMLElement | null;
    inputElem: HTMLInputElement | null;
    confirmBtnElem: HTMLElement | null;
  }
  chosenIndexes: number[];
  questionNumber: number;
  rightAnswers: number;
  maxQuestionNumber: number;
  quiz: IQuiz;
}


export default class App implements IApp {
  /**
   * @param {HTMLElement} element 
   * @param {Quiz} quiz 
   */
  public element: Element;
  public elems!: {
    headerElem?: HTMLElement | null;
    questionElem: HTMLElement | null;
    answerElem: HTMLElement | null;
    progressElem: HTMLElement | null;
    scoreElem: HTMLElement | null;
    inputElem: HTMLInputElement | null;
    confirmBtnElem: HTMLElement | null;
  }
  chosenIndexes!: number[];
  public questionNumber: number = -1;
  public rightAnswers: number = 0;
  public maxQuestionNumber: number;
  public quiz: IQuiz;



  constructor(element: Element, quiz: IQuiz) {
    this.element = element;
    this.quiz = quiz;
    this.maxQuestionNumber = quiz.questions.length-1;
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
    this.elems = {
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
  private handleAnswerButtonClick(event: any): void { //отличается в зависимости от answers
    // if (!this.elems.answerElem) return; 
    // let answIndex = [...this.elems.answerElem.childNodes].indexOf(event.target);
    // if (this.quiz.checkAnswer(answIndex)) this.rightAnswers += 1;
    const question = this.quiz.currentQuestion;
    if (!question) return;
    if (!question.handleAnswerClick) {
      throw new Error('Something went wrong');
    }
    question.handleAnswerClick(this, event.target);
    this.displayNext();
  }
  private handleChooseAnswer(event: any): void {
    const question = this.quiz.currentQuestion;
    if (!question) return;
    if(!question.handleChooseClick) {
      throw new Error('Something went wrong');
    }
    question.handleChooseClick(this, event.target);
  }

  protected restartListeners(): void {
    if (!this.elems.answerElem || !this.elems.confirmBtnElem) {
      throw new Error('Something went wrong');
    }
    this.elems.answerElem.removeEventListener('click', this.handleAnswerButtonClick);
    this.elems.answerElem.removeEventListener('click', this.handleChooseAnswer);
    this.elems.confirmBtnElem.removeEventListener('click', this.handleAnswerButtonClick);

    const currentQuest = this.quiz.currentQuestion;
    if (!currentQuest) {
      this.displayScore();
    } else {
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

    if (this.questionNumber <= this.maxQuestionNumber) {
      this.questionNumber += 1;
      this.render();
    }
  }

  public clearAll() {// отличается(нужно добавлять/скрывать инпут/кнопку дальше)
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
    if (!question) throw new Error('something went wrong');
    if (!question.displayAnswers) throw new Error('something went wrong');
    question.displayAnswers(this);
  }

  /**
   * Отображает прогресс ('Вопрос 1 из 5').
   */
  public displayProgress(): void {// остается таким же
    if (!this.elems.progressElem) return;
    this.elems.progressElem.textContent = `Question ${this.questionNumber+1} of ${this.maxQuestionNumber+1}...${this.rightAnswers}`;
  }

  /**
   * Отображает результат теста.
   */
  public displayScore(): void {// остается таким же
    if (!this.elems.scoreElem) return;
    this.elems.scoreElem.textContent = `У вас ${this.rightAnswers} правильных ответов из ${this.maxQuestionNumber+1}`;
  }
}

export { IApp };