const Input = require('../input');
const Checkbox = require('./');

xdescribe('Checkbox', () => {
    let checkbox;

    describe('Checkbox.constructor()', () => {
        let checkbox = new Checkbox({
            tag: 'input',
            id: 'checkbox',
            className: 'checkbox',
            type: 'checkbox',
            name: 'required',
            disabled: false,
            required: true,
            checked: false
        });

        test('создает объект типа `Checkbox`', () => {
            expect(checkbox).toBeInstanceOf(Checkbox);
        });

        test('создает объект наследующий `Input`', () => {
            expect(checkbox).toBeInstanceOf(Input);
        });

        test('создает объект c необходимыми свойствами', () => {
            expect(checkbox).toHaveProperty('tag', 'input');
            expect(checkbox).toHaveProperty('id', 'checkbox');
            expect(checkbox).toHaveProperty('className', 'checkbox');
            expect(checkbox).toHaveProperty('type', 'checkbox');
            expect(checkbox).toHaveProperty('name', 'required');
            expect(checkbox).toHaveProperty('value', false);
            expect(checkbox).toHaveProperty('disabled', false);
            expect(checkbox).toHaveProperty('required', true);
            expect(checkbox).toHaveProperty('checked', false);
        });
    });

    describe('Checkbox.checked', () => {
        test('возвращает `true` если checkbox отмечен', () => {
            let checkbox = new Checkbox({ checked: true });

            expect(checkbox.checked).toBe(true);
        });

        test('возвращает `false` если checkbox не отмечен', () => {
            let checkbox = new Checkbox({ checked: false });

            expect(checkbox.checked).toBe(false);
        });

        test('сообщает о смене свойства `checked`', () => {
            let checkbox = new Checkbox({ checked: false });
            let onChange = jest.fn();

            checkbox.on('change', onChange);
            checkbox.checked = true;

            expect(onChange).toHaveBeenCalledWith(true);
        });
    });

    describe('Checkbox.isValid', () => {
        test('возвращает `true` если значение checkboxа валидное', () => {
            let checkbox = new Checkbox({ checked: true });

            expect(checkbox.isValid).toBe(true);
        });

        test('возвращает `false` если значение checkboxа не валидное', () => {
            let checkbox = new Checkbox({ checked: '42' });

            expect(checkbox.isValid).toBe(false);
        });
    });
});