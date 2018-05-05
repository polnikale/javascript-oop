export default class Quiz {
  /**
   * @param {string} title 
   * @param {Question[]} quiestions 
   */
  title: string;
  questions: Question[];

  constructor(title: string, questions: Question[]) {
    this.title = title;
    this.questions = questions;
  }

  /**
   * Возвращает текущий вопрос.
   * 
   * @returns {Question}
   */
  get currentQuestion(): Question {
    return 
  }

  /**
   * Возвращает `true/false` в зависимости от того закончился тест или нет.
   * 
   * @returns {boolean}
   */
  get hasEnded() {
      
  }

  /**
   * Проверяет правильность ответа выбранного пользователем.
   * @param {*} answer 
   */
  checkAnswer(answer) {
      
  }
}