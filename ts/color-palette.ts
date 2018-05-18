type IColor =  { red: number, green: number, blue: number }[];

interface IColorPalette {
  // colorPaletteHandler(event: MouseEvent): void; Хендлеры не вижу смысла добавлять в интерфейс

  currentColorElem: Element | null;
  currentColor: string;
  createColor({elemName, className, color, parent}: 
    {
      elemName: string, 
      className: string, 
      color: IColor[0], 
      parent?: HTMLElement
    }):  void;
}


class ColorPalette implements IColorPalette{
  private element: HTMLElement;
  private colors: IColor;
  private activeIndex!: number;
  constructor({element, colors}: {element: HTMLElement, colors: IColor}) {
    this.element = element;
    this.colors = colors;

    this.element.addEventListener('click', this.colorPaletteHandler.bind(this));

    this.init();
  }

  init() {
    this.colors.forEach((color) => {
      this.createColor({
        elemName: 'li', 
        className: 'color-palette__color', 
        color,
        parent: this.element
      });
    });
  }

  createColor(
    {elemName, className, color, parent = this.element}: 
    {
      elemName: string, 
      className: string, 
      color: IColor[0], 
      parent?: HTMLElement
    }): void {
    const colorLi = document.createElement(elemName);
    colorLi.className = className;
    colorLi.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
    parent.appendChild(colorLi);
  }

  colorPaletteHandler(event: MouseEvent): void {
    let target = <HTMLElement>event.target;
    if (!target) {
      return;
    }
    if (target.tagName !== 'LI') { // clicked out of the circle
      return;
    }

    if (this.activeIndex != null) {
      this.element.children[this.activeIndex].classList.remove('selected');
    }
    this.activeIndex = Array.from(this.element.children).indexOf(target);
    target.classList.add('selected');
  }


  get currentColorElem(): HTMLElement | null {
    return <HTMLElement>this.element.children[this.activeIndex] || null;
  }

  get currentColor(): string {
    const currElem = this.currentColorElem;
    if (!currElem) {
      return 'black';
    }
    return getComputedStyle(currElem).getPropertyValue('background-color') || 'black';
  }

}

export { IColorPalette, ColorPalette, IColor };