import Grid from './grid.js';
import Controls from './controls.js';

export default class Game {
  constructor({size, gameElem}) {
    this.grid = new Grid({size, gridElem: gameElem.querySelector('#grid')});
    this.controls = new Controls(gameElem.querySelector('.controls')); // controlsElem
  
    this.controls.on('createNewLayer', () => {
      console.log('ok');
    });
    this.controls.on('clear', () => {
      console.log('cleeeaaaariiing');
    });
  }
}