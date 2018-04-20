class Textfield {
    constructor({
        id,
        className,
        value = '',
        required,
        onChange = () => {},
        validate = () => {}
    }) {
        this.onChange = onChange;
        this.validate = validate;
        this._focused = false;
        this._invalid = false;

        this.init({ id, className, required, value });
    }

    get id() { return this.element.id; }
    get className() { return this.element.className; }
    get required() { return this.element.required; }

    get value() { return this.element.value; }
    set value(value) {
        this.onChange(this.value);
    }

    get focused() { return this._focused; }
    set focused(value) {
        this._focused = value;

        if (value === true) {
            this.element.classList.add('focused');
        } else {
            this.element.classList.remove('focused');
        }
    }

    get invalid() { return this._invalid; }
    set invalid(value) {
        this._invalid = value;

        if (value === true) {
            this.element.classList.add('invalid');
        } else {
            this.element.classList.remove('invalid');
        }
    }

    init({ id, className, required, value }) {
        this.element = document.createElement('input');

        this.element.id = id;
        this.element.className = className;
        this.element.value = value;
        this.element.required = required;

        this.element.addEventListener('input', this.handleChange.bind(this));
        this.element.addEventListener('focus', this.handleFocus.bind(this));
        this.element.addEventListener('blur', this.handleBlur.bind(this));
    }

    handleChange(event) {
        this.value = event.target.value;
    }

    handleFocus(event) {
        this.focused = true;
    }

    handleBlur(event) {
        this.focused = false;
        this.invalid = this.validate(this.value);
    }
}