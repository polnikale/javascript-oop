import jsdom from 'jsdom';

import Tab from './tab';

const dom = new jsdom.JSDOM(`<!DOCTYPE html>`);
const document = dom.window.document;

describe('Tab', () => {
    let tab;
    let activeTab;
    let handleClick = jest.fn();

    beforeEach(() => {
        const tabElement = document.createElement('a');

        tabElement.href = '#panel-1';
        tabElement.className = 'tab';

        tab = new Tab({ element: tabElement, onActivate: handleClick });

        const activeTabElement = document.createElement('a');

        activeTabElement.href = '#panel-1';
        activeTabElement.className = 'tab active';
        
        activeTab = new Tab({ element: activeTabElement, onActivate: handleClick });
    });

    describe('Tab.constructor()', () => {
        test('создает объект типа `Tab`', () => {
            expect(tab).toBeInstanceOf(Tab);
        });
    });

    describe('Tab.id', () => {
        test('возвращает `id`', () => {
            expect(tab.id).toBe('panel-1');
        });
    })

    describe('Tab.isActive', () => {
        test('возвращает `false` если элемент не имеет класс `active`', () => {
            expect(tab.isActive).toBe(false);
        });

        test('возвращает `true` если элемент имеет класс `active`', () => {
            expect(activeTab.isActive).toBe(true);
        });

        test('устанавливает внутренее свойство `_active` и добавляет соответствующий класс', () => {
            tab.isActive = true;
            activeTab.isActive = false;

            expect(tab.isActive).toBe(true);
            expect(tab.element.classList.contains('active')).toBe(true);
            expect(activeTab.isActive).toBe(false);
            expect(activeTab.element.classList.contains('active')).toBe(false);
        });
    });

    describe('Tab.handleClick()', () => {
        let isActiveBeforeClick;

        beforeEach(() => {
            isActiveBeforeClick = tab.isActive;
            tab.element.click();
        });

        test('изменяет активность', () => {
            expect(tab.isActive).not.toBe(isActiveBeforeClick);
        });

        test('вызывает функцию обратного вызова', () => {
            expect(handleClick).toHaveBeenCalled();
        });

        test('отправляет в функцию обратного вызова `this`', () => {
            expect(handleClick).toHaveBeenCalledWith(tab);
        });
    });
});