export default class TabBar {
  /**
   * Создает объект.
   * @param {{ element: HTMLElement, tabs: Tab[], onChange: Function }} args
   */
  constructor({element, tabs, onChange}) {
    this._elem = element;
    this._tabs = tabs;
    this._activeTab = tabs[0];
    this._onChange = onChange;
  }

  /**
   * Инициализирует объект.
   * Устанавливает обработчик для обработки активации вкладки.
   * @private
   */
  init() {
    this._tabs.forEach((elem) => {
      elem.clickHandler = this.handleActivate;
    })
  }

  /**
   * Возвращает HTML элемент.
   * @returns {HTMLElement}
   */
  get element() {
    return this._elem;
  }

  /**
   * Возвращает массив вкладок.
   * @returns {Tab[]}
   */
  get tabs() {
    return this._tabs;
  }

  /**
   * Возвращает активную вкладку.
   * @returns {Tab}
   */
  get activeTab() {
    return this._activeTab;
  }

  /**
   * Возвращает индекс активной вкладки.
   * @returns {number}
   */
  get activeTabIndex() {
    return this._tabs.indexOf(this.activeTab);
  }

  /**
   * Вызывается при активации вкладки.
   * Делает все вкладки кроме активной неактивными.
   * Вызывает функцию обратно вызова, отправляя туда активную вкладку.
   * @private
   * @param {Tab} activeTab 
   */
  handleActivate(neededTab) {
    this._tabs.forEach((elem) => {
      if (elem === neededTab) {
        this._activeTab = elem;
      } else {
        elem.isActive = false;
      }
    });
  }
}