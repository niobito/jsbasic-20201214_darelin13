import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();

    this.addEventListeners();
  }

  addProduct(product) {
    if (this.cartItems.length === 0) {
      this.cartItems.push({product: product, count: 1});
    } else {
      let cyclesCounter = 0;
      for (let item of this.cartItems) {
        if (item.product.name === product.name) {
          ++item.count;
          break;
        }
        ++cyclesCounter;
      }
      if (cyclesCounter === this.cartItems.length) {
        this.cartItems.push({product: product, count: 1});
      }
    }
    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (productId === item.product.id) {
        this.cartItems[index].count = item.count + amount;
      }
      if (item.count <= 0) {
        this.cartItems.splice(index, 1);
      }
    });
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    if (this.cartItems.length === 1) return this.cartItems[0].count;
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    if (this.cartItems.length === 1) return this.cartItems[0].count * this.cartItems[0].product.price;
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal.setTitle('Your order');
    const div = document.createElement('div');
    this.cartItems.forEach(item => div.append(this.renderProduct(item.product, item.count)));
    div.append(this.renderOrderForm());
    this.modal.setBody(div);
    const cartProduct = div.querySelectorAll('.cart-product');
    div.querySelectorAll('.cart-counter__button_plus').forEach((plusButton, index) => {
      plusButton.addEventListener('click', () => {
        this.updateProductCount(cartProduct[index].dataset.productId, 1);
      });
    });
    div.querySelectorAll('.cart-counter__button_minus').forEach((minusButton, index) => {
      minusButton.addEventListener('click', () => {
        this.updateProductCount(cartProduct[index].dataset.productId, -1);
      });
    });
    div.querySelector('.cart-form').addEventListener('submit', () => {
      this.onSubmit(event);
    });
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    if (document.querySelector(".is-modal-open")) {
      this.renderModal();
      if (this.isEmpty()) {
        this.modal.close();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    document.querySelector('[type="submit"]').classList.add('is-loading');
    const form = document.querySelector('.cart-form');
    fetch('https://httpbin.org/post',
      {
        method: 'POST',
        body: new FormData(form),
      }
    ).then(response => {
      if (response) {
        this.modal.setTitle('Success!');
        this.cartItems = [];
        document.querySelector('.modal__body').innerHTML = `<div class="modal__body-inner">
             <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
            </p>
        </div>`;
        this.cartIcon.update(this);
      }
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

