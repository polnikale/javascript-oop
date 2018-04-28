const Element = require('./');

xdescribe.only('Element', () => {
    describe('Element.className', () => {
        test('возвращает строку с названием CSS классов', () => {
            let element = new Element({});

            element.addClass('foo');
            element.addClass('bar');
            element.addClass('bar');

            expect(element.className).toBe('foo bar');
        });
    });

    describe('Element.addClass()', () => {
        test('добавляет CSS класс', () => {
            let element = new Element({});

            element.addClass('foo');

            expect(element.className).toBe('foo');
        });
    });

    describe('Element.removeClass()', () => {
        test('удаляет CSS класс', () => {
            let element = new Element({});

            element.addClass('foo');
            element.addClass('bar');
            element.removeClass('bar');

            expect(element.className).toBe('foo');
        });
    });

    describe('Element.hasClass()', () => {
        test('возвращает `true` если CSS класс есть', () => {
            let element = new Element({});

            element.addClass('foo');

            expect(element.hasClass('foo')).toBe(true);
        });

        test('возвращает `false` если класса нет', () => {
            let element = new Element({});

            expect(element.hasClass('foo')).toBe(false);
        });
    });

    describe('Element.toggleClass()', () => {
        test('добавляет или удаляет CSS класс в зависимости от его наличия', () => {
            let element = new Element({});

            element.toggleClass('foo');

            expect(element.hasClass('foo')).toBe(true);
        });

        test('возвращает `false` если класса нет', () => {
            let element = new Element({});

            element.addClass('foo');
            element.toggleClass('foo');

            expect(element.hasClass('foo')).toBe(false);
        });
    });
});