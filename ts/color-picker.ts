interface IColorPicker {
}

export default class ColorPicker {
  private element: Element;
  private newColorBtn: Element | null;
  private opened: Boolean = false;

  constructor({element}: {element: Element}) {
    this.element = element;

    this.newColorBtn = document.querySelector('#new-color-button');

    this.init();
  }

  init(): void {
    if (!this.newColorBtn) return;
    this.newColorBtn.addEventListener('click', this.handleToggleColorClick.bind(this));
  }

  handleToggleColorClick(event: Event): void {
    this.opened = !this.opened;
    this.element.classList.toggle('open', this.opened);
  }
}