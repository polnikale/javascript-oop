import { IQuestion, Question, TAnswer } from './question';
interface IQuiz {
  index: number;
  currentQuestion: IQuestion | undefined;
  hasEnded: boolean;
  maxQuestionNumber: number;
  rightAnswers: number;
  readonly title: string;
}

class Quiz implements IQuiz {
  /**
   * @param {string} title 
   * @param {Question[]} quiestions 
   */
  readonly title: string;
  private _index: number = -1;
  private _maxQuestionNumber: number;
  private _rightAnswers: number;
  questions: IQuestion[];

  constructor(title: string, questions: IQuestion[]) {
    this.title = title;
    this.questions = questions;
    this._maxQuestionNumber = questions.length - 1;
    this._rightAnswers = 0;
  }

  get index() {
    return this._index;
  }
  set index(value) {
    this._index = value;
  }

  get maxQuestionNumber() {
    return this._maxQuestionNumber;
  }

  get rightAnswers() {
    return this._rightAnswers;
  }
  set rightAnswers(value: number) {
    this._rightAnswers = value;
  }

  /**
   * Возвращает текущий вопрос.
   * 
   * @returns {Question}
   */
  get currentQuestion(): IQuestion | undefined {
    return this.questions[this.index];
  }

  /**
   * Возвращает `true/false` в зависимости от того закончился тест или нет.
   * 
   * @returns {boolean}
   */
  get hasEnded(): boolean {
    return this.currentQuestion !== undefined;
  }
  //@codedojo checkAnswer убрал, переложил это на композиционные методы
}

export { IQuiz, Quiz };