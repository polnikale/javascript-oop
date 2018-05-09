import { IApp } from './app';

type TAnswer = number | number[] | string;

interface IQuestion {
  text: string;
  type: string;
  answers: string[];
  correctAnswer: TAnswer;
  isCorrectAnswer?(answer: number): boolean;
  handleAnswerClick?(app: IApp, target: Element): void;
}

const withSingleBehavior =  { // Скорее всего, в дочернем элементе изменять действие внешнего элемента - плохая практика, но я ничего лушче пока придумать не могу
  handleAnswerClick(app: IApp, target: Element): void {
    if (!app.elems.answerElem) return; 
    let answIndex = [...app.elems.answerElem.childNodes].indexOf(target);
    if (app.quiz.checkAnswer(answIndex)) app.rightAnswers += 1;
  }
};

const withMultipleBehavior = {
  handleAnswerClick(app: IApp, target: Element): void {
    if (!app.elems.answerElem) return; 
    let answIndex = [...app.elems.answerElem.childNodes].indexOf(target);
    if (app.quiz.checkAnswer(answIndex)) app.rightAnswers += 1;
  }
};

const withOpenBehavior = {
  
};

class Question implements IQuestion {
  /**
   * @param {string} text Текст вопроса
   * @param {string[]} answers Варианты ответов
   * @param {TAnswer} correctAnswer Индекс правильного ответа
   */
  readonly text: string;
  readonly type: string;
  readonly answers: string[];
  public correctAnswer: TAnswer;


  constructor(text: string, type: string, answers: string[] = [], correctAnswer: TAnswer) {
    this.text = text;
    this.type = type;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  /**
   * Проверяет правильность ответа.
   * 
   * @param {number} answer
   * @returns {boolean}
   */
  isCorrectAnswer(answer: TAnswer): boolean {
    return answer === this.correctAnswer;
  }
}

export { TAnswer, IQuestion, Question, withSingleBehavior, withOpenBehavior, withMultipleBehavior };