import { IQuestion, Question } from './question';
interface IQuiz {
  title: string;
  questions: IQuestion[];
  index: number;
  readonly currentQuestion: IQuestion | undefined;
  readonly hasEnded: boolean;
  checkAnswer: (answer: number) => boolean;
}

class Quiz implements IQuiz {
  /**
   * @param {string} title 
   * @param {Question[]} quiestions 
   */
  public title: string;
  public index: number = -1;
  questions: IQuestion[];

  constructor(title: string, questions: IQuestion[]) {
    this.title = title;
    this.questions = questions;
  }

  /**
   * Возвращает текущий вопрос.
   * 
   * @returns {Question}
   */
  get currentQuestion(): IQuestion | undefined {
    if (this.index < this.questions.length) return this.questions[this.index];
    return undefined;
  }

  /**
   * Возвращает `true/false` в зависимости от того закончился тест или нет.
   * 
   * @returns {boolean}
   */
  get hasEnded(): boolean {
    return this.currentQuestion !== null;
  }

  /**
   * Проверяет правильность ответа выбранного пользователем.
   * @param {*} answer 
   */
  public checkAnswer(answer: number): boolean {
    const currQuest: IQuestion | undefined = this.currentQuestion;
    if (currQuest === undefined) {
      return false;
    }
    return answer === currQuest.correctAnswer;
  }
}

export { IQuiz, Quiz };