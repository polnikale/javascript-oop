class ColorPicker {
    constructor({ element }) {
        this.opened = false;
        this.element = element;
        this.events = {};
        this.handleChangeSpanColor = this.handleChangeSpanColor.bind(this);
        this.handleToggleColorClick = this.handleToggleColorClick.bind(this);
        this.handleAddNewBtn = this.handleAddNewBtn.bind(this);
        this.init();
    }
    init() {
        this.newColorBtn = document.querySelector('#new-color-button');
        this.spanPreview = document.querySelector('.color-picker__preview');
        this.colorPickerSliders = document.querySelectorAll('input.color-picker__slider');
        this.closeBtn = document.querySelector('.color-picker__close-button');
        this.createNewBtn = document.querySelector('.color-picker__add-button');
        if (!this.newColorBtn)
            return;
        this.newColorBtn.addEventListener('click', this.handleToggleColorClick);
        if (!this.closeBtn)
            return;
        this.closeBtn.addEventListener('click', this.handleToggleColorClick);
        if (!this.colorPickerSliders)
            return;
        Array.from(this.colorPickerSliders).forEach((slider) => {
            slider.addEventListener('input', this.handleChangeSpanColor);
        });
        if (!this.createNewBtn)
            return;
        this.createNewBtn.addEventListener('click', this.handleAddNewBtn);
        this.handleChangeSpanColor();
    }
    handleToggleColorClick() {
        this.opened = !this.opened;
        this.element.classList.toggle('open', this.opened); // ts ругается на this.opened
    }
    handleChangeSpanColor() {
        let colorArr = [];
        if (!this.colorPickerSliders || !this.spanPreview) {
            return;
        }
        Array.from(this.colorPickerSliders).forEach((slider) => {
            colorArr.push(slider.value);
        });
        this.spanPreview.style.backgroundColor = `rgb(${colorArr.toString()})`;
    }
    handleAddNewBtn() {
        let colorObj = { red: 0, green: 0, blue: 0 };
        if (!this.colorPickerSliders) {
            return;
        }
        Array.from(this.colorPickerSliders).forEach((slider) => {
            colorObj[slider.name] = slider.value; // тут на дефайнпроперти возмущается, очень интересно как пофиксить
            slider.value = '0';
        });
        this.emit('colorAdd', colorObj);
        this.handleToggleColorClick();
        this.handleChangeSpanColor();
    }
    // реализация что-то типа eventEmitter
    on(event, listener) {
        this.events[event] = this.events[event] || []; // @codedojo мне тут ts жалуется на this.events[event]. Даже не знаю что делать.
        this.events[event].push(listener);
    }
    emit(event, arg) {
        let myEvent = this.events[event] || [];
        myEvent.forEach((listener) => {
            listener(arg);
        });
    }
}
export { ColorPicker };
