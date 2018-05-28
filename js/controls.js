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
      this.play();
    } else {
      this.pause();
    }
  }

  pause() {
    this.playBtn.textContent = 'play_arrow';
    this.clearLayerInterval();
  }

  play() {
    this.playBtn.textContent = 'pause';
      this.interval = setInterval(() => {
        this.emitNewLayer();
      }, this.time); 
  }

  handleResetGame() {
    this.pause();
    this.emit('clear');
  }
  
  handleRandomizeGame() {
    this.pause();
    this.emit('randomize');
  }

  handleChangeSpeed(event) {
    this.time = 1000 - event.target.value;
    if (this.interval !== null) {
      this.clearLayerInterval();
      this.interval = setInterval(() => {
        this.emitNewLayer();
      }, this.time); 
    }
  }

  emitNewLayer() {
    this.emit('createNewLayer');
  }

  clearLayerInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }
}