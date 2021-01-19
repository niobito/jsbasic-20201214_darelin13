import createElement from '../../assets/lib/create-element.js';

function slideTemplate({ image, price, name, id}) {
  return `<div class="carousel__slide" data-id="${id}">
            <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
                <span class="carousel__price">€${price}</span>
                <div class="carousel__title">${name}</div>
                <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
            </div>
  </div>`;
}

function carouselTemplate(slides) {
  return `<div class="carousel">
            <div class="carousel__arrow carousel__arrow_right">
                <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </div>
            <div class="carousel__arrow carousel__arrow_left">
                <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
            </div>

            <div class="carousel__inner">
            ${slides.map(slide => slideTemplate(slide)).join('')}
  </div>>`;
}

function createCarousel(slides) {
  const div = document.createElement('div');
  div.innerHTML = carouselTemplate(slides);
  return div.firstElementChild;
}

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._container = null;
    this._pictureCounter = 0;

    this._render();
  }

  get elem() {
    return this._container;
  }

  get _buttonRight() {
    return this._container.querySelector('.carousel__arrow_right');
  }

  get _buttonLeft() {
    return this._container.querySelector('.carousel__arrow_left');
  }

  get _pictureValue() {
    return this._container.querySelectorAll('.carousel__slide').length;
  }

  get _carouselInner() {
    return this._container.querySelector('.carousel__inner');
  }

  _addArrowButtonListener() {
    this._hideButton(this._pictureCounter);

    this._buttonRight.addEventListener('click', this._nextSlide);
    this._buttonLeft.addEventListener('click', this._prevSlide);
  }

  _nextSlide = () => {
    ++this._pictureCounter;
    const offset = this._offset;
    this._carouselInner.style.transform = this._translateValue(this._pictureCounter, offset);
    this._hideButton(this._pictureCounter);
  }

  _prevSlide = () => {
    --this._pictureCounter;
    const offset = this._offset;
    this._carouselInner.style.transform = this._translateValue(this._pictureCounter, offset);
    this._hideButton(this._pictureCounter);
  }

  get _offset() {
    return this._carouselInner.offsetWidth;
  }

  _translateValue(pictureCounter, offset) {
    return `translateX(-${offset * pictureCounter}px)`;
  }

  _hideButton(pictureCounter) {
    pictureCounter === 0 ? this._buttonLeft.style.display = 'none' : this._buttonLeft.style.display = '';
    pictureCounter === this._pictureValue - 1 ? this._buttonRight.style.display = 'none' : this._buttonRight.style.display = '';
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
    this._container = createCarousel(this.slides);
    this._addArrowButtonListener();
    this._addButtonEventListener(this.slides);
  }
}
