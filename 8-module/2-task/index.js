import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

function createGridTemplate() {
  return `<div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>`;
}

function createGrid() {
  const div = document.createElement('div');
  div.innerHTML = createGridTemplate();
  return div.firstElementChild;
}

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: '',
    };


    this._container = null;
    this._render();
  }

  get elem() {
    return this._container;
  }

  get _gridInner() {
    return this.elem.querySelector('.products-grid__inner');
  }

  _addProducts({noNuts, vegeterianOnly, maxSpiciness, category} = {}) {
    this._gridInner.innerHTML = '';
    this.products
      .filter(product => noNuts ? product.nuts === !noNuts || product.nuts === undefined : product)
      .filter(product => vegeterianOnly ? product.vegeterian === vegeterianOnly : product)
      .filter(product => maxSpiciness < 4 ? product.spiciness <= maxSpiciness : product)
      .filter(product => category ? product.category === category : product)
      .forEach(product => {
        this._gridInner.append(new ProductCard(product).elem);
      });
  }

  _render() {
    this._container = createGrid();
    this._addProducts();
  }

  get _cards() {
    return this.elem.querySelectorAll('.card');
  }

  updateFilter(filter) {
    for (let key in this.filters) {
      if (filter[key] !== undefined) {
        this.filters[key] = filter[key];
      }
    }
    this._addProducts(this.filters);
  }
}
