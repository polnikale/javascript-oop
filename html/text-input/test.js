const Input = require('../input');
const TextInput = require('./');

describe.only('TextInput', () => {
    let textInput;

    describe('TextInput.constructor()', () => {
        beforeEach(() => {
            textInput = new TextInput({ type: 'text' });
        });

        test('создает объект типа `TextInput`', () => {
            expect(textInput).toBeInstanceOf(TextInput);
        });

        test('создает объект наследующий `Input`', () => {
            expect(textInput).toBeInstanceOf(Input);
        });
    });

    describe('TextInput.value', () => {
        let onChange;

        beforeEach(() => {
            onChange = jest.fn();

            textInput = new TextInput({});

            textInput.on('change', onChange);
        });

        test('устанавливает и возвращает значение textInput', () => {
            textInput.value = 'olegpolyakov';

            expect(textInput.value).toBe('olegpolyakov');
        });

        test('сообщает о смене свойства `value`', () => {
            textInput.value = 'olegpolyakov';
            
            expect(onChange).toHaveBeenCalledWith('olegpolyakov');
        });
    });

    describe('TextInput.isValid', () => {
        beforeEach(() => {
            textInput = new TextInput({ minlength: 2, maxlength: 16 });
        });

        test('возвращает `true` если значение textInput валидное', () => {
            textInput.value = 'olegpolyakov';

            expect(textInput.isValid).toBe(true);
        });

        test('возвращает `false` если значение textInput не валидное', () => {
            textInput.value = 'o';

            expect(textInput.isValid).toBe(false);
        });
    });
});