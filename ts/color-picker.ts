interface IColorPicker {
}

export default class ColorPicker {
  private element: Element;
  private newColorBtn!: Element | null;
  private opened: Boolean = false;
  private spanPreview!: Element | null;
  private colorPickerSliders!: HTMLCollectionOf<HTMLInputElement> | null;


  constructor({element}: {element: Element}) {
    this.element = element;

    this.changeSpanColorHandler = this.changeSpanColorHandler.bind(this);

    this.init();
  }

  init(): void {
    this.newColorBtn = document.querySelector('#new-color-button');
    this.spanPreview = document.querySelector('')
    this.colorPickerSliders = document.getElementsByClassName('color-picker__slider');
    if (!this.newColorBtn) return;
    this.newColorBtn.addEventListener('click', this.handleToggleColorClick.bind(this));
  }

  handleToggleColorClick(event: Event): void {
    this.opened = !this.opened;
    if (this.opened) {
      if (!this.colorPickerSliders) {
        return;
      }
      Array.from(this.colorPickerSliders).forEach((slider) => {
        slider.addEventListener('change', this.changeSpanColorHandler);
      });
    }
    this.element.classList.toggle('open', this.opened);
  }

  changeSpanColorHandler() {
    let colorArr: string[] = [];
    if (!this.colorPickerSliders) {
      return;
    }
    Array.from(this.colorPickerSliders).forEach((slider) => {
      colorArr.push(slider.value);
    })
    this.spanPreview.style.backgroundColor = `rgb(${colorArr.toString()})`;
  }
}