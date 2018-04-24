const Input = require('../input');
const TextInput = require('../text-input');
const EmailInput = require('./');

describe.only('EmailInput', () => {
    let emailInput;

    describe('EmailInput.constructor()', () => {
        beforeEach(() => {
            emailInput = new EmailInput({
                tag: 'input',
                id: 'text-input',
                className: 'text-input',
                type: 'email',
                name: 'email',
                disabled: false,
                required: true
            });
        });

        test('создает объект типа `EmailInput`', () => {
            expect(emailInput).toBeInstanceOf(EmailInput);
        });

        test('создает объект типа `TextInput`', () => {
            expect(emailInput).toBeInstanceOf(TextInput);
        });

        test('создает объект наследующий `Input`', () => {
            expect(emailInput).toBeInstanceOf(Input);
        });

        test('создает объект c необходимыми свойствами', () => {
            expect(emailInput).toHaveProperty('tag', 'input');
            expect(emailInput).toHaveProperty('id', 'text-input');
            expect(emailInput).toHaveProperty('className', 'text-input');
            expect(emailInput).toHaveProperty('type', 'email');
            expect(emailInput).toHaveProperty('name', 'email');
            expect(emailInput).toHaveProperty('disabled', false);
            expect(emailInput).toHaveProperty('required', true);
            expect(emailInput).toHaveProperty('minlength');
            expect(emailInput).toHaveProperty('maxlength');
        });
    });

    describe('EmailInput.isValid', () => {
        test('возвращает `true` если значение emailInput валидное', () => {
            let emailInput = new EmailInput({ value: 'olegpolyakov@outlook.com' });

            expect(emailInput.isValid).toBe(true);
        });

        test('возвращает `false` если значение emailInput не валидное', () => {
            let emailInput = new EmailInput({ value: 'olegpolyakov' });

            expect(emailInput.isValid).toBe(false);
        });
    });
});