export default class ColorPalette {
    constructor({ element, colors }) {
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
