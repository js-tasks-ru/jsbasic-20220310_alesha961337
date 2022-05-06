import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
    this.addEventListener();
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>
    `);
    const sliderSteps = this.elem.querySelector('.slider__steps');
    sliderSteps.children[0].classList.add('slider__step-active');
    this.sliderSteps = sliderSteps;
  }

  addEventListener() {

    this.elem.querySelector('.slider__thumb').ondragstart = () => false;
    this.elem.onclick = this.onClick;
    this.elem.querySelector('.slider__thumb').onpointerdown = this.pointerDown;


  }

  onClick = event => {
    let clickPoint = this.clickPoint(event);
    let clickSegmentsValue = clickPoint * this.segments;
    let segmentsValue = Math.round(clickSegmentsValue);
    let segmentsValuePercents = segmentsValue / this.segments * 100;
    this.elem.querySelector('.slider__thumb').style.left = `${segmentsValuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${segmentsValuePercents}%`;
    this.elem.querySelector('.slider__value').textContent = `${segmentsValue}`;
    this.value = segmentsValue;

    if (this.elem.querySelector('.slider__step-active')) {
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    }
    this.elem.querySelector('.slider__steps').children[`${segmentsValue}`].classList.add('slider__step-active');

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

  pointerDown = (event) => {
    document.addEventListener('pointermove', this.pointerMove);
    document.addEventListener('pointerup', this.pointerUp);

  }

  pointerMove = (event) => {

    event.preventDefault();
    this.elem.classList.add('slider_dragging');
    let clickPoint = this.clickPoint(event);
    let clickSegmentsValue = clickPoint * this.segments;
    let segmentsValue = Math.round(clickSegmentsValue);
    this.elem.querySelector('.slider__thumb').style.left = `${clickSegmentsValue / this.segments * 100}%`; // segmentsValuePercents
    this.elem.querySelector('.slider__progress').style.width = `${clickSegmentsValue / this.segments * 100}%`;
    this.elem.querySelector('.slider__value').textContent = `${segmentsValue}`;
    this.value = segmentsValue;

    if (this.elem.querySelector('.slider__step-active')) {
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    }
    this.elem.querySelector('.slider__steps').children[`${segmentsValue}`].classList.add('slider__step-active');
  }

  clickPoint(event) {
    let clickPoint = (event.clientX - this.elem.offsetLeft) / this.elem.offsetWidth;
    if (clickPoint > 1) {
      clickPoint = 1;
    } else if (clickPoint < 0) {
      clickPoint = 0;
    }
    return clickPoint;
  }

  pointerUp = () => {
    document.removeEventListener('pointermove', this.pointerMove);
    document.removeEventListener('pointerup', this.pointerUp);

    this.elem.classList.remove('slider_dragging');

    this.elem.querySelector('.slider__thumb').style.left = `${(this.value / this.segments) * 100}%`;
    this.elem.querySelector('.slider__progress').style.width = `${(this.value / this.segments) * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }
}