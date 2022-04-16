import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`<div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
            </button>
            <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
          </div>
          <div class="modal__body">A сюда нужно добавлять содержимое тела модального окна</div>
        </div>
      </div>`);
    this.modalCloseBtn();
    this.modalCloseEsc();
  }

  setTitle(modalTitle) {
    this.elem.querySelector('.modal__title').textContent = modalTitle;
  }
  
  setBody(bodyElement) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.textContent = '';
    modalBody.insertAdjacentElement('beforeend', bodyElement);
  }

  open() {
    document.body.insertAdjacentElement("beforeend", this.elem);
    document.body.classList.add('is-modal-open');
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    this.elem.removeEventListener('click', this.funcCloseBtn);
    document.body.removeEventListener('keydown', this.funcCloseEsc);
  }

  modalCloseBtn() {
    let funcCloseBtn = (event) => {
      if (event.target.closest('.modal__close')) {
        this.close();
      }
    };
    this.funcCloseBtn = funcCloseBtn;
    this.elem.addEventListener('click', funcCloseBtn);
  }

  modalCloseEsc() {
    let funcCloseEsc = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
    this.funcCloseEsc = funcCloseEsc;
    document.body.addEventListener('keydown', funcCloseEsc);
  }
}