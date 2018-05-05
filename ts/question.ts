interface IQuestion {
  text: string;
  answers: string[];
  correctAnswer: number;
  isCorrectAnswer (answer: number): boolean;
}

class Question implements IQuestion {
  /**
   * @param {string} text Текст вопроса
   * @param {string[]} answers Варианты ответов
   * @param {number} correctAnswer Индекс правильного ответа
   */
  text: string;
  answers: string[];
  correctAnswer: number;


  constructor(text: string, answers: string[], correctAnswer: number) {
    this.text = text;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  /**
   * Проверяет правильность ответа.
   * 
   * @param {number} answer
   * @returns {boolean}
   */
  isCorrectAnswer(answer: number): boolean {
    return answer === this.correctAnswer;
  }
}

export {IQuestion, Question};