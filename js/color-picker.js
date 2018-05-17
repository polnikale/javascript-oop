export default class ColorPicker {
    constructor({ element }) {
        this.opened = false;
        this.element = element;
        this.newColorBtn = document.querySelector('#new-color-button');
        this.init();
    }
    init() {
        if (!this.newColorBtn)
            return;
        this.newColorBtn.addEventListener('click', this.handleToggleColorClick.bind(this));
    }
    handleToggleColorClick(event) {
        this.opened = !this.opened;
        this.element.classList.toggle('open', this.opened);
    }
}
