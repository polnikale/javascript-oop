interface IColorPicker {
}

export default class ColorPicker {
  private element: HTMLElement;
  private newColorBtn!: HTMLElement | null;
  private opened: Boolean = false;
  private spanPreview!: HTMLElement | null;
  private colorPickerSliders!: NodeListOf<HTMLInputElement> | null;
  private closeBtn!: HTMLElement | null;


  constructor({element}: {element: HTMLElement}) {
    this.element = element;

    this.handleChangeSpanColor = this.handleChangeSpanColor.bind(this);
    this.handleToggleColorClick = this.handleToggleColorClick.bind(this);

    this.init();
  }

  init(): void {
    this.newColorBtn = document.querySelector('#new-color-button');
    this.spanPreview = document.querySelector('.color-picker__preview')
    this.colorPickerSliders = document.querySelectorAll('input.color-picker__slider');
    this.closeBtn = document.querySelector('.color-picker__close-button');

    if (!this.newColorBtn) return;
    this.newColorBtn.addEventListener('click', this.handleToggleColorClick);

    if (!this.closeBtn) return;
    this.closeBtn.addEventListener('click', this.handleToggleColorClick);

    if (!this.colorPickerSliders) {
      return;
    }
    Array.from(this.colorPickerSliders).forEach((slider) => {
      slider.addEventListener('input', this.handleChangeSpanColor);
    });

    this.handleChangeSpanColor();
  }

  handleToggleColorClick(event: Event): void {
    this.opened = !this.opened;
    this.element.classList.toggle('open', this.opened);
  }

  handleChangeSpanColor() {
    let colorArr: string[] = [];
    if (!this.colorPickerSliders || !this.spanPreview) {
      return;
    }
    Array.from(this.colorPickerSliders).forEach((slider) => {
      colorArr.push(slider.value);
    })
    this.spanPreview.style.backgroundColor = `rgb(${colorArr.toString()})`;
  }
}