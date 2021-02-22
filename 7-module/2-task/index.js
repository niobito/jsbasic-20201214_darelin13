import createElement from '../../assets/lib/create-element.js';

function createModalTemplate() {
  return `<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
  </div>`;
}

function createModal() {
  const div = document.createElement('div');
  div.innerHTML = createModalTemplate();
  return div.firstElementChild;
}

export default class Modal {
  constructor() {
    this._container = null;

    this._render();
  }

  get _documentBody() {
    return document.querySelector('body');
  }

  get _modal() {
    return document.querySelector('.modal');
  }

  open() {
    this._documentBody.classList.add('is-modal-open');
    this._documentBody.insertAdjacentElement('beforeend', this._container);
  }

  close = () => {
    this._documentBody.classList.remove('is-modal-open');
    this._modalBody.innerHTML = '';
    this._container.remove();
  }

  get _modalTitle() {
    return this._container.querySelector('.modal__title');
  }

  get _modalBody() {
    return this._container.querySelector('.modal__body');
  }

  /**
   *
   * @param {string} title
   */
  setTitle(title) {
    this._modalTitle.innerHTML = '';
    this._modalTitle.insertAdjacentText('beforeend', title);
  }

  /**
   *
   * @param {Element} body
   */
  setBody(body) {
    this._modalBody.innerHTML = '';
    this._modalBody.insertAdjacentElement('beforeend', body);
  }

  _render() {
    this._container = createModal();
    this._container.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', () => {
      if (event.code === 'Escape') {
        this.close();
      }
    });
  }
}
