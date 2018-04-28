const Element = require('../element');
const Input = require('./');

xdescribe.only('Input', () => {
    let input;

    describe('Input.constructor()', () => {
        beforeEach(() => {
            input = new Input({
                tag: 'input',
                id: 'input',
                className: 'input',
                type: 'text',
                name: 'name',
                value: 42,
                disabled: false,
                required: true
            });
        });

        test('создает объект типа `Input`', () => {
            expect(input).toBeInstanceOf(Input);
        });

        test('создает объект наследующий `Element`', () => {
            expect(input).toBeInstanceOf(Element);
        });

        test('создает объект c необходимыми свойствами', () => {
            expect(input).toHaveProperty('tag', 'input');
            expect(input).toHaveProperty('id', 'input');
            expect(input).toHaveProperty('className', 'input');
            expect(input).toHaveProperty('type', 'text');
            expect(input).toHaveProperty('name', 'name');
            expect(input).toHaveProperty('value', 42);
            expect(input).toHaveProperty('disabled', false);
            expect(input).toHaveProperty('required', true);
        });
    });

    describe('Input.value', () => {
        test('возвращает значение input', () => {
            let input = new Input({ value: 42 });

            expect(input.value).toBe(42);
        });

        test('устанавливает значение input', () => {
            let input = new Input({});

            input.value = 42;

            expect(input.value).toBe(42);
        });

        test('сообщает о смене свойства `value`', () => {
            let input = new Input({});
            let onChange = jest.fn();;
            
            input.on('change', onChange);
            input.value = 42;
            
            expect(onChange).toHaveBeenCalledWith(42);
        });
    });

    describe('Input.isValid', () => {
        test('возвращает `true` если значение input валидное', () => {
            let input = new Input({ required: true });

            input.value = 42;

            expect(input.isValid).toBe(true);
        });

        test('возвращает `false` если значение input не валидное', () => {
            let input = new Input({ required: true });

            expect(input.isValid).toBe(false);
        });
    });
});