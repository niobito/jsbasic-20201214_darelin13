import createElement from '../../assets/lib/create-element.js';

/**
 * Возвращает html код для ribbon item
 * @param {string} id
 * @param {string} name
 * @return {string}
 */
function createRibbonItemTemplate ({ id, name }) {
  return id !== ''
    ? `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`
    : `<a href="#" class="ribbon__item ribbon__item_active" data-id="">${name}</a>`;
}

/**
 * Возвращает html код для ribbon inner
 * @param {Array<Object>} categories
 * @return {string}
 */
function createRibbonInnerTemplate(categories) {
  return `<nav class="ribbon__inner">
      ${categories.map((category) => createRibbonItemTemplate(category)).join('')}
    </nav>`;
}

/**
 * Возвращает html код кнопки
 * @param {string} side
 * @return {string}
 */
function createRibbonButton(side) {
  return `<button class="ribbon__arrow ribbon__arrow_${side} ribbon__arrow_visible">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`;
}

/**
 * Возвращает html код для ribbon
 * @param {Array<Object>} categories
 * @return {string}
 */
function createRibbonTemplate(categories) {
  return `<div class="ribbon">
    ${createRibbonButton('left')}
    ${createRibbonInnerTemplate(categories)}
    ${createRibbonButton('right')}
  </div>`;
}

/**
 * Возвращает ribbon элемент
 * @param {Array<Object>} categories
 * @return {Element}
 */
function createRibbon(categories) {
  const div = document.createElement('div');
  div.innerHTML = createRibbonTemplate(categories);
  return div.firstElementChild;
}

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._container = null;

    this._render();
  }

  /**
   * Возвращает отрендеренный элемент ribbon
   * @return {Element}
   */
  get elem() {
    return this._container;
  }

  /**
   * Возвращает ribbon__inner
   * @return {Element}
   * @private
   */
  get _ribbonInner() {
    return this._container.querySelector('.ribbon__inner');
  }

  /**
   * Возвращает левую стрелку
   * @return {Element}
   * @private
   */
  get _ribbonLeftButton() {
    return this._container.querySelector('.ribbon__arrow_left');
  }

  /**
   * Возвращает правую стрелку
   * @return {Element}
   * @private
   */
  get _ribbonRightButton() {
    return this._container.querySelector('.ribbon__arrow_right');
  }

  /**
   * Возвращает расстояние скролла до левого края
   * @return {number}
   * @private
   */
  get _scrollLeft() {
    return this._ribbonInner.scrollLeft;
  }

  /**
   * Возвращает расстояние скролла до правого края
   * @return {number}
   * @private
   */
  get _scrollRight() {
    return  this._ribbonInner.scrollWidth - this._scrollLeft - this._ribbonInner.clientWidth;
  }

  /**
   * Устанавливает видимость кнопок
   * @private
   */
  _hideButton() {
    this._scrollLeft < 1
      ? this._ribbonLeftButton.classList.remove('ribbon__arrow_visible')
      : this._ribbonLeftButton.classList.add('ribbon__arrow_visible');
    this._scrollRight < 1
      ? this._ribbonRightButton.classList.remove('ribbon__arrow_visible')
      : this._ribbonRightButton.classList.add('ribbon__arrow_visible');
  }

  /**
   * Листенер для левой стрелки
   * @private
   */
  _moveLeft = () => {
    this._ribbonInner.scrollBy(-350, 0);
    this._hideButton();
  }

  /**
   * Листенер для правой стрелки
   * @private
   */
  _moveRight = () => {
    this._ribbonInner.scrollBy(350, 0);
    this._hideButton();
  }

  /**
   * Кастомное событие для item элементов
   * @private
   */
  _addItemCustomEvent() {
    const item = this._container.querySelectorAll('.ribbon__item');
    item.forEach((item) => item.addEventListener('click', () => {
      const event = new CustomEvent(
        "ribbon-select",
        {
          detail: item.dataset.id,
          bubbles: true
        }
      );

      this._container.dispatchEvent(event);
    }));
  }

  /**
   * Добавляет листенер к стрелкам
   * @private
   */
  _addButtonListener() {
    this._ribbonLeftButton.addEventListener('click', this._moveLeft);
    this._ribbonRightButton.addEventListener('click', this._moveRight);
  }

  /**
   * Рендерит элемент
   * @private
   */
  _render() {
    this._container = createRibbon(this.categories);
    this._addItemCustomEvent();
    this._addButtonListener();
  }
}
