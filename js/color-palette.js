export default class ColorPalette {
    constructor({ element, colors }) {
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
    colorPaletteHandler(event) {
        let target = event.target;
        if (!target) {
            return;
        }
        if (target.tagName !== 'LI') { // clicked out of the circle
            return;
        }
        if (this.activeIndex != null) {
            this.element.childNodes[this.activeIndex].classList.remove('active');
        }
        this.activeIndex = Array.from(this.element.childNodes).indexOf(target);
        target.classList.add('active');
    }
}
