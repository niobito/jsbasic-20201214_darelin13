import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.productsGrid = null;
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  get _grid() {
    return document.querySelector('[data-products-grid-holder]');
  }

  get _body() {
    return document.querySelector('body');
  }

  get _nutsCheckbox() {
    return document.querySelector('#nuts-checkbox');
  }

  get _vegeterianChecbox() {
    return document.querySelector('#vegeterian-checkbox');
  }

  async render() {
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
    const products = await fetch('./products.json', { method: 'GET'}).then(resp => resp.json());
    this.productsGrid = new ProductsGrid(products);
    this._grid.innerHTML = '';
    this._grid.append(this.productsGrid.elem);
    this.productsGrid.updateFilter({
      noNuts: this._nutsCheckbox.checked,
      vegeterianOnly: this._vegeterianChecbox.checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
    this._body.addEventListener('product-add', () => {
      this.cart.addProduct(products.find(product => product.id === event.detail));
    });
    this._body.addEventListener('slider-change', () => {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail, });
    });
    this._body.addEventListener('ribbon-select', () => {
      this.productsGrid.updateFilter({ category: event.detail, });
    });
    this._nutsCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({ noNuts: this._nutsCheckbox.checked, });
    });
    this._vegeterianChecbox.addEventListener('change', () => {
      console.log(event);
      this.productsGrid.updateFilter({ vegeterianOnly: this._vegeterianChecbox.checked, });
    });
  }
}
