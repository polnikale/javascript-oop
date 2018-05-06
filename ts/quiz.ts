import { IQuestion, Question } from './question';
interface IQuiz {
  title: string;
  questions: IQuestion[];
  readonly currentQuestion: IQuestion | undefined;
}

class Quiz implements IQuiz {
  /**
   * @param {string} title 
   * @param {Question[]} quiestions 
   */
  title: string;
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
    for (let question of this.questions) {
      if (question.text === this.title) return question;
    }
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
  checkAnswer(answer: number): boolean {
    if (this.currentQuestion === undefined) {
      return false;
    }
    const currQuest: IQuestion = this.currentQuestion;
    return answer === currQuest.correctAnswer;
  }
}

export { IQuiz, Quiz };