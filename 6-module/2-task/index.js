export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
  }

  render() {
    const el = document.createElement('DIV');
    el.className = 'card';
    const elTop = document.createElement('DIV');
    elTop.className = 'card__top';
    const elBody = document.createElement('DIV');
    elBody.className = 'card__body';
    el.append(elTop, elBody);

    const topItems = `<img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
        <span class="card__price">€${(this.product.price).toFixed(2)}</span>`;

    const bodyItems = `<div class="card__title">${this.product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>`;

    elTop.insertAdjacentHTML('beforeend', topItems);
    elBody.insertAdjacentHTML('beforeend', bodyItems);

    el.addEventListener('click', event => {
      const clickEvent = new CustomEvent('product-add', {bubbles: true, detail: this.product.id});
      if (event.target.closest('button')) {
        el.dispatchEvent(clickEvent);
      }
    });
    
    return el;
  }
}