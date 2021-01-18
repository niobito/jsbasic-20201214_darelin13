import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._container = null;

    this._render();
  }

  get elem() {
    return this._container;
  }

  _img({ image }) {
    return `<img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">`;
  }

  _caption(slide) {
    const caption = document.createElement('div');
    caption.classList.add('carousel__caption');
    caption.insertAdjacentHTML('beforeend', this._price(slide));
    caption.insertAdjacentHTML('beforeend', this._title(slide));
    caption.insertAdjacentHTML('beforeend', this._button());
    return caption;
  }

  _price({ price }) {
    return `<span class="carousel__price">€${price}</span>`;
  }

  _title({ name }) {
    return `<div class="carousel__title">${name}</div>`;
  }

  _button() {
    return `<button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>`;
  }

  _template(slide) {
    const carouselSlide = document.createElement('div');
    carouselSlide.classList.add('carousel__slide');
    carouselSlide.insertAdjacentHTML('beforeend', this._img(slide));
    carouselSlide.append(this._caption(slide));
    carouselSlide.dataset.id = slide.id;
    return carouselSlide;
  }

  get _inner() {
    const inner = document.createElement('div');
    inner.classList.add('carousel__inner');
    const slides = this.slides.map(slide => this._template(slide));
    slides.forEach(slide => inner.insertAdjacentElement('beforeend', slide));
    return inner;
  }

  get _arrowsButton() {
    return `<div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`;
  }

  _addArrowButtonListener() {
    const buttonRight = this._container.querySelector('.carousel__arrow_right');
    const buttonLeft = this._container.querySelector('.carousel__arrow_left');
    const pictureValue = this._container.querySelectorAll('.carousel__slide').length;
    const carouselInner = this._container.querySelector('.carousel__inner');
    let pictureCounter = 0;

    function hideButton(pictureCounter) {
      pictureCounter === 0 ? buttonLeft.style.display = 'none' : buttonLeft.style.display = '';
      pictureCounter === pictureValue - 1 ? buttonRight.style.display = 'none' : buttonRight.style.display = '';
    }

    function translateValue(pictureCounter, offset) {
      return `translateX(-${offset * pictureCounter}px)`;
    }

    hideButton(pictureCounter);

    buttonRight.addEventListener('click', () => {
      ++pictureCounter;
      const offset = this._offset;
      carouselInner.style.transform = translateValue(pictureCounter, offset);
      hideButton(pictureCounter);
    });

    buttonLeft.addEventListener('click', () => {
      --pictureCounter;
      const offset = this._offset;
      carouselInner.style.transform = translateValue(pictureCounter, offset);
      hideButton(pictureCounter);
    });
  }

  get _offset() {
    const carouselInner = this._container.querySelector('.carousel__inner');
    const carouselWidth = carouselInner.offsetWidth;
    return carouselWidth;
  }

  _addButtonEventListener(slides) {
    const button = this._container.querySelectorAll('button');
    button.forEach((button, index) => button.addEventListener('click', () => {
      const event = new CustomEvent(
        "product-add",
        {
          detail: slides[index].id,
          bubbles: true
        }
      );

      this._container.dispatchEvent(event);
    }));
  }

  _render() {
    this._container = document.createElement('div');
    this._container.classList.add('carousel');
    this._container.insertAdjacentHTML('beforeend', this._arrowsButton);
    this._container.insertAdjacentElement('beforeend', this._inner);
    this._addArrowButtonListener();
    this._addButtonEventListener(this.slides);
  }
}
