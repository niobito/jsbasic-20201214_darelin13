import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this._container = null;

    this._render();
  }

  get elem() {
    return this._container;
  }

  get _top() {
    const top = document.createElement('div');
    top.classList.add('card__top');
    top.insertAdjacentHTML('beforeend', this._src(this.product));
    top.insertAdjacentHTML('beforeend', this._price(this.product));
    return top;
  }

  _src({ image }) {
    return `<img src="/assets/images/products/${image}" class="card__image" alt="product">`;
  }

  _price({ price }) {
    return `<span class="card__price">€${price.toFixed(2)}</span>`;
  }

  get _body() {
    const body = document.createElement('div');
    body.classList.add('card__body');
    body.insertAdjacentHTML('beforeend', this._title(this.product));
    body.insertAdjacentHTML('beforeend', this._button());
    return body;
  }

  _title({ name }) {
    return `<div class="card__title">${name}</div>`;
  }

  _button() {
    return `<button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>`;
  }

  _productAdd = () => {
    const event = new CustomEvent(
      "product-add",
      {
        detail: this.product.id,
        bubbles: true
      }
    );

    this._container.dispatchEvent(event);
  }

  _render() {
    this._container = document.createElement('div');
    this._container.classList.add('card');
    this._container.append(this._top);
    this._container.append(this._body);
    this._container.querySelector('button').addEventListener('click', this._productAdd);
  }
}
