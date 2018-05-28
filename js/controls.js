import EventEmitter from './event-emitter.js';

export default class Controls extends EventEmitter {
  constructor(controlsElem) {
    super();

    this.controlsElem = controlsElem;

    this.handleToggleGame = this.handleToggleGame.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.handleRandomizeGame = this.handleRandomizeGame.bind(this);
    this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
    this.emitNewLayer = this.emitNewLayer.bind(this);

    this.interval = null;
    this.time = 1000;

    this.init()
  }

  init() {
    this.playBtn = this.controlsElem.querySelector('#play-button');
    this.resetBtn = this.controlsElem.querySelector('#reset-button');
    this.randomizeBtn = this.controlsElem.querySelector('#randomize-button');
    this.speedSlider = this.controlsElem.querySelector('#speed-slider');

    this.playBtn.addEventListener('click', this.handleToggleGame);
    this.resetBtn.addEventListener('click', this.handleResetGame);
    this.randomizeBtn.addEventListener('click', this.handleRandomizeGame);
    this.speedSlider.addEventListener('click', this.handleChangeSpeed);
  }

  handleToggleGame() {
    if (this.interval == null) {
      this.interval = setInterval(() => {
        this.emitNewLayer();
      }, this.time); 
    } else {
      this.clearLayerInterval();
    }
  }

  handleResetGame() {
    this.clearLayerInterval();
    this.emit('clear');
  }
  
  handleRandomizeGame() {

  }

  handleChangeSpeed() {

  }

  emitNewLayer() {
    this.emit('createNewLayer');
  }

  clearLayerInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }
}