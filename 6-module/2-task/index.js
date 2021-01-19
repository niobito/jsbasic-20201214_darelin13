import createElement from '../../assets/lib/create-element.js';

function createCardTemplate({ image, price, name }) {
  return `<div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${image}" class="card__image" alt="product">
            <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
    </div>`;
}

function createCard(product) {
  const div = document.createElement('div');
  div.innerHTML = createCardTemplate(product);
  return div.firstElementChild;
}

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this._container = null;

    this._render();
  }

  get elem() {
    return this._container;
  }

  _render() {
    this._container = createCard(this.product);

    this._container.querySelector('button').addEventListener('click', () => {
      const event = new CustomEvent(
        "product-add",
        {
          detail: this.product.id,
          bubbles: true
        }
      );

      this._container.dispatchEvent(event);
    });
  }
}
