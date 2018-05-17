class ColorPalette {
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
            this.element.children[this.activeIndex].classList.remove('selected');
        }
        this.activeIndex = Array.from(this.element.children).indexOf(target);
        target.classList.add('selected');
    }
    get currentColorElem() {
        return this.element.children[this.activeIndex] || null;
    }
    get currentColor() {
        const currElem = this.currentColorElem;
        if (!currElem) {
            return 'black';
        }
        return getComputedStyle(currElem).getPropertyValue('background-color') || 'black';
    }
}
export { ColorPalette };
