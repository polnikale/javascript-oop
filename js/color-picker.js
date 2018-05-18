export default class ColorPicker {
    constructor({ element }) {
        this.opened = false;
        this.element = element;
        this.changeSpanColorHandler = this.changeSpanColorHandler.bind(this);
        this.init();
    }
    init() {
        this.newColorBtn = document.querySelector('#new-color-button');
        this.spanPreview = document.querySelector('.color-picker__preview');
        this.colorPickerSliders = document.getElementsByClassName('color-picker__slider');
        if (!this.newColorBtn)
            return;
        this.newColorBtn.addEventListener('click', this.handleToggleColorClick.bind(this));
    }
    handleToggleColorClick(event) {
        this.opened = !this.opened;
        if (this.opened) {
            if (!this.colorPickerSliders) {
                return;
            }
            Array.from(this.colorPickerSliders).forEach((slider) => {
                slider.addEventListener('input', this.changeSpanColorHandler);
            });
        }
        this.element.classList.toggle('open', this.opened);
    }
    changeSpanColorHandler() {
        let colorArr = [];
        if (!this.colorPickerSliders) {
            return;
        }
        Array.from(this.colorPickerSliders).forEach((slider) => {
            colorArr.push(slider.value);
        });
        console.log(this.spanPreview);
        this.spanPreview.style.backgroundColor = `rgb(${colorArr.toString()})`;
    }
}
