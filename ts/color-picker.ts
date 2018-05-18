interface IColorPicker {
}

export default class ColorPicker {
  private element: HTMLElement;
  private newColorBtn!: HTMLElement | null;
  private opened: Boolean = false;
  private spanPreview!: HTMLElement | null;
  private colorPickerSliders!: NodeListOf<HTMLInputElement> | null;


  constructor({element}: {element: HTMLElement}) {
    this.element = element;

    this.handleChangeSpanColor = this.handleChangeSpanColor.bind(this);

    this.init();
  }

  init(): void {
    this.newColorBtn = document.querySelector('#new-color-button');
    this.spanPreview = document.querySelector('color-picker__preview')
    this.colorPickerSliders = document.querySelectorAll('input.color-picker__slider');
    if (!this.newColorBtn) return;
    this.newColorBtn.addEventListener('click', this.handleToggleColorClick.bind(this));

    this.handleChangeSpanColor();
  }

  handleToggleColorClick(event: Event): void {
    this.opened = !this.opened;
    if (this.opened) {
      if (!this.colorPickerSliders) {
        return;
      }
      Array.from(this.colorPickerSliders).forEach((slider) => {
        slider.addEventListener('change', this.handleChangeSpanColor);
      });
    }
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