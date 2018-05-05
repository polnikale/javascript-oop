import {IQuestion, Question} from './question';
interface IQuiz {
  title: string;
  questions: IQuestion[];
  readonly currentQuestion: IQuestion;
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
  get currentQuestion(): IQuestion {
    for (let question of this.questions) {
      if (question.text === this.title) return question;
    }
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
  checkAnswer(answer: any): boolean {
    const currQuest = this.currentQuestion;
    return answer === currQuest.answers[currQuest.correctAnswer];
  }
}

export {IQuiz, Quiz};