type IColor =  { red: number, green: number, blue: number }[];

interface IColorPalette {
  readonly element: Element;
  colors: IColor;
}


export default class ColorPalette implements IColorPalette {
  readonly element: Element;
  colors: IColor;
  constructor({element, colors}: {element: Element, colors: IColor}) {
    this.element = element;
    this.colors = colors;

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
}