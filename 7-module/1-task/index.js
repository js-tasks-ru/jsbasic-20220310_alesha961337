import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.scrollRibbonInner();
    this.selectRibbonInner();
  }

  render() {

    const ribbon = document.createElement('DIV');
    ribbon.classList.add('ribbon');

    const ribbonLeftBtn = `<button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`;
    const ribbonRightBtn = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alr="icon">
      </button>`;
    ribbon.insertAdjacentHTML('afterbegin', ribbonLeftBtn);
    ribbon.insertAdjacentHTML('beforeend', ribbonRightBtn);

    const ribbonInner = document.createElement('NAV');
    ribbonInner.classList.add('ribbon__inner');
    ribbon.append(ribbonInner);

    const ribbonInnerItems = this.categories.map(item => {
      return `<a href="#" class="ribbon__item " data-id="${item.id}">${item.name}</a>`;
    }).join('');
    ribbonInner.insertAdjacentHTML('beforeend', ribbonInnerItems);

    this.ribbon = ribbon;
    this.ribbonInner = ribbonInner;

    return ribbon;
  }

  scrollRibbonInner() {

    this.ribbon.addEventListener('click', event => {
      this.ribbonLeftBtn = document.querySelector('.ribbon__arrow_left');
      this.ribbonRightBtn = document.querySelector('.ribbon__arrow_right');

      if (event.target.closest(`button`) === this.ribbonLeftBtn) {
        this.ribbonInner.scrollBy(-350, 0);
        this.hiddenRibbonBnt();
      } else if (event.target.closest(`button`) === this.ribbonRightBtn) {
        this.ribbonInner.scrollBy(350, 0);
        this.hiddenRibbonBnt();
      }
    });
  }

  hiddenRibbonBnt() {

    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollRight < 1) {
      this.ribbonRightBtn.classList.remove('ribbon__arrow_visible');
    } else if (scrollLeft < 1) {
      this.ribbonLeftBtn.classList.remove('ribbon__arrow_visible');
    } else {
      this.ribbonRightBtn.classList.add('ribbon__arrow_visible');
      this.ribbonLeftBtn.classList.add('ribbon__arrow_visible');
    }
  }

  selectRibbonInner() {

    this.ribbonInner.addEventListener('click', event => {
      if (event.target.tagName === "A") {
        event.preventDefault();
        for (let i = 0; i < this.ribbonInner.children.length; i++) {
          if (this.ribbonInner.children[i].classList.contains('ribbon__item_active')) {
            this.ribbonInner.children[i].classList.remove('ribbon__item_active');
          }
        }
        event.target.classList.add('ribbon__item_active');

        this.ribbon.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: event.target.getAttribute('data-id'),
          bubbles: true
        }));
      }
    });
  }
}