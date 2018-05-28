import Grid from './grid.js';
import Controls from './controls.js';

export default class Game {
  constructor({size, gameElem}) {
    this.grid = new Grid({size, gridElem: gameElem.querySelector('#grid')});
    this.controls = new Controls(gameElem.querySelector('.controls')); // controlsElem

    this.handleClear = this.handleClear.bind(this);
    this.handleNewLayer = this.handleNewLayer.bind(this);
    this.handleRandomize = this.handleRandomize.bind(this);
  
    this.controls.on('createNewLayer', this.handleNewLayer);
    this.controls.on('clear', this.handleClear);
    this.controls.on('randomize', this.handleRandomize);
  }

  handleClear() {

  }

  handleNewLayer() {

  }

  handleRandomize() {

  }
}