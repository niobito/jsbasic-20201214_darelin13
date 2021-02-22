function createSpanTemplate(steps) {
  const span = [];
  while (steps > 0) {
    span.push('<span></span>');
    --steps;
  }
  return span.join('');
}

function createSliderTemplate(steps) {
  return `<div class="slider">
    <div class="slider__thumb"">
      <span class="slider__value"></span>
    </div>
    <div class="slider__progress""></div>
    <div class="slider__steps">
      ${createSpanTemplate(steps)}
    </div>
  </div>`;
}

function createSlider(steps, value) {
  const div = document.createElement('div');
  div.innerHTML = createSliderTemplate(steps, value);
  return div.firstElementChild;
}

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._container = null;
    this._segments = steps - 1;

    this._render();
  }

  get elem() {
    return this._container;
  }

  get _thumb() {
    return this._container.querySelector('.slider__thumb');
  }

  get _progress() {
    return this._container.querySelector('.slider__progress');
  }

  get _sliderValue() {
    return this._container.querySelector('.slider__value');
  }

  get _approximateValue() {
    return ((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth) * this._segments;
  }

  get _valuePercent() {
    const percent = this.value / this._segments * 100;
    if (percent < 0) return 0;
    if (percent > 100) return 100;
    return percent;
  }

  _customEvent = () => {
    const customEvent = new CustomEvent(
      'slider-change',
      {
        detail: this.value,
        bubbles: true
      }
    );

    this._container.dispatchEvent(customEvent);
  }

  _setCurrentSpan(value) {
    const allSpan = this._container.querySelectorAll('.slider__steps > span:nth-child(n+1)');
    allSpan.forEach((span, index) =>{
      index === value ? span.classList.add('slider__step-active') : span.classList.remove('slider__step-active');
    });
  }

  _setValue() {
    if (this.value < 0) return 0;
    if (this.value > this._segments) return this._segments;
    this._sliderValue.innerText = Math.round(this.value);
  }

  _setStyle() {
    this._thumb.style.left = `${this._valuePercent}%`;
    this._progress.style.width = `${this._valuePercent}%`;
  }

  _setSliderState = () => {
    this.value = this._approximateValue;
    this._setStyle();
    this._setValue();
    this._setCurrentSpan(this.value);
  }

  _addEventListener() {
    this.elem.addEventListener('click', () => {
      this.value = Math.round(this._approximateValue);

      this._setStyle();
      this._setValue();
      this._setCurrentSpan(this.value);
      this._customEvent();
    });
  }

  _addDragAndDrop() {
    this._thumb.addEventListener('pointerdown', () => {
      this.elem.classList.add('slider_dragging');
      document.addEventListener('pointermove', this._setSliderState);
      document.addEventListener('pointerup', () => {
        this.value = Math.round(this._approximateValue);
        this._setStyle();
        this._setValue();
        this._setCurrentSpan(this.value);
        this.elem.classList.remove('slider_dragging');
        this._customEvent();
        document.removeEventListener('pointermove', this._setSliderState);
      }, {once: true});
    });
  }

  _render() {
    this._container = createSlider(this.steps, this.value, this._valuePercent);
    this._setStyle();
    this._setValue();
    this._setCurrentSpan(this.value);
    this._addEventListener();
    this._thumb.ondragstart = () => false;
    this._addDragAndDrop();
  }
}
