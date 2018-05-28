import EventEmitter from './event-emitter.js';

export default class Controls extends EventEmitter {
  constructor(controlsElem) {
    super();

    this.controlsElem = controlsElem;

    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.handleRandomizeGame = this.handleRandomizeGame.bind(this);
    this.handleChangeSpeed = this.handleChangeSpeed.bind(this);

    this.init()
  }

  init() {
    this.playBtn = this.controlsElem.querySelector('#play-button');
    this.resetBtn = this.controlsElem.querySelector('#reset-button');
    this.randomizeBtn = this.controlsElem.querySelector('#randomize-button');
    this.speedSlider = this.controlsElem.querySelector('#speed-slider');

    this.playBtn.addEventListener('click', this.handleStartGame);
    this.resetBtn.addEventListener('click', this.handleResetGame);
    this.randomizeBtn.addEventListener('click', this.handleRandomizeGame);
    this.speedSlider.addEventListener('click', this.handleChangeSpeed);
  }

  handleStartGame() {

  }

  handleResetGame() {

  }
  
  handleRandomizeGame() {

  }

  handleChangeSpeed() {

  }
}