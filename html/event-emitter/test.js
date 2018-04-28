const EventEmitter = require('./');

describe.only('EventEmitter', () => {
    describe('EventEmitter.on()', () => {
        test('регистрирует обработчик на событие', () => {
            let eventEmitter = new EventEmitter({});
            let listener = () => {console.log(5)};

            eventEmitter.on('start', listener);

            expect(eventEmitter.events['start'][0]).toEqual(listener);
        });
    });

    describe('Element.emit()', () => {
        test('сообщает обработчикам о событии', () => {
            let eventEmitter = new EventEmitter({});
            let listener = jest.fn();

            eventEmitter.on('start', listener);
            eventEmitter.emit('start');

            expect(listener).toHaveBeenCalled();
        });
    });
});