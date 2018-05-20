import { IColor, IColorPalette } from './color-palette.js';

interface IColorPicker {
  on(event: string, listener: (arg?: any) => void): void;
  emit(event: string, arg: any): void;
}

class ColorPicker implements IColorPicker{
  private element: HTMLElement;
  private newColorBtn!: HTMLElement | null;
  private opened: Boolean = false;
  private spanPreview!: HTMLElement | null;
  private colorPickerSliders!: NodeListOf<HTMLInputElement> | null;
  private closeBtn!: HTMLElement | null;
  private createNewBtn!: HTMLElement | null;

  protected events: object;


  constructor({element}: {element: HTMLElement}) {
    this.element = element;

    this.events = {};

    this.handleChangeSpanColor = this.handleChangeSpanColor.bind(this);
    this.handleToggleColorClick = this.handleToggleColorClick.bind(this);
    this.handleAddNewBtn = this.handleAddNewBtn.bind(this);

    this.init();
  }

  init(): void {
    this.newColorBtn = document.querySelector('#new-color-button');
    this.spanPreview = document.querySelector('.color-picker__preview')
    this.colorPickerSliders = document.querySelectorAll('input.color-picker__slider');
    this.closeBtn = document.querySelector('.color-picker__close-button');
    this.createNewBtn = document.querySelector('.color-picker__add-button');

    if (!this.newColorBtn) return;
    this.newColorBtn.addEventListener('click', this.handleToggleColorClick);

    if (!this.closeBtn) return;
    this.closeBtn.addEventListener('click', this.handleToggleColorClick);

    if (!this.colorPickerSliders) return;
    Array.from(this.colorPickerSliders).forEach((slider) => { // по хорошему, тут, как и везде в похожих местах, можно было бы юзать Array.prototype.forEach.call(), но енивей компайлится в ESNEXT
      slider.addEventListener('input', this.handleChangeSpanColor);
    });

    if (!this.createNewBtn) return;
    this.createNewBtn.addEventListener('click', this.handleAddNewBtn);

    this.handleChangeSpanColor();
  }

  handleToggleColorClick(): void {
    this.opened = !this.opened;
    this.element.classList.toggle('open', this.opened); // ts ругается на this.opened
  }

  handleChangeSpanColor(): void {
    let colorArr: string[] = [];
    if (!this.colorPickerSliders || !this.spanPreview) {
      return;
    }
    Array.from(this.colorPickerSliders).forEach((slider) => {
      colorArr.push(slider.value);
    })
    this.spanPreview.style.backgroundColor = `rgb(${colorArr.toString()})`;
  }

  handleAddNewBtn(): void {
    let colorObj = {red: 0, green: 0, blue: 0};
    if (!this.colorPickerSliders) {
      return;
    }
    Array.from(this.colorPickerSliders).forEach((slider) => {
      colorObj[slider.name] = slider.value; // тут на дефайнпроперти возмущается, очень интересно как пофиксить
      slider.value = '0';
    })
    this.emit('colorAdd', colorObj)
    this.handleToggleColorClick();
    this.handleChangeSpanColor();
  }


  // реализация что-то типа eventEmitter

  on(event: string, listener: (arg?: any) => void): void {
    this.events[event] = this.events[event] || []; // @codedojo мне тут ts жалуется на this.events[event]. Даже не знаю что делать.
    this.events[event].push(listener);
  }
  emit(event: string, arg: any): void {
    let myEvent = this.events[event] || [];
    myEvent.forEach((listener: (arg?: any) => void) => {
      listener(arg);
    })
  }
}

export { ColorPicker, IColorPicker };