class ColorPalette {
    constructor({ element, colors }) {
        this.element = element;
        this.colors = colors;
        this.element.addEventListener('click', this.colorPaletteHandler.bind(this));
        this.init();
    }
    init() {
        this.colors.forEach((color) => {
            this.createColor({
                color
            });
        });
    }
    createColor({ elemName = 'li', className = 'color-palette__color', color, parent = this.element }) {
        const colorLi = document.createElement(elemName);
        colorLi.className = className;
        colorLi.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        parent.appendChild(colorLi);
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
