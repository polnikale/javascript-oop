type IColor =  { red: number, green: number, blue: number }[];

interface IColorPalette {
  // colorPaletteHandler(event: MouseEvent): void; Хендлеры не вижу смысла добавлять в интерфейс

  currentColorElem: Element | null;
  currentColor: string;
}


class ColorPalette implements IColorPalette{
  private element: Element;
  private colors: IColor;
  private activeIndex!: number;
  constructor({element, colors}: {element: Element, colors: IColor}) {
    this.element = element;
    this.colors = colors;

    this.element.addEventListener('click', this.colorPaletteHandler.bind(this));

    this.init();
  }

  init() {
    this.colors.forEach((color) => {
      const colorLi = document.createElement('li');
      colorLi.className = 'color-palette__color';
      colorLi.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
      this.element.appendChild(colorLi);
    });
  }

  colorPaletteHandler(event: MouseEvent): void {
    let target = <Element>event.target;
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


  get currentColorElem(): Element | null {
    return this.element.children[this.activeIndex] || null;
  }

  get currentColor(): string {
    const currElem = this.currentColorElem;
    if (!currElem) {
      return 'black';
    }
    return getComputedStyle(currElem).getPropertyValue('background-color') || 'black';
  }

}

export { IColorPalette, ColorPalette };