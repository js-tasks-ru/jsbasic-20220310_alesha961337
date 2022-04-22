import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
    this.sliderDragAndDrop();
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

  sliderPointerMove(event) {
    let clickPoint = (event.clientX - this.elem.offsetLeft) / this.elem.offsetWidth;
    let clickSegmentsValue = clickPoint * this.segments;
    let segmentsValue = Math.round(clickSegmentsValue);
    let segmentsValuePercents = segmentsValue / this.segments * 100;
    this.sliderThumb.style.left = `${segmentsValuePercents}%`;
    this.sliderProgress.style.width = `${segmentsValuePercents}%`;
    this.sliderValue.textContent = `${segmentsValue}`;
    this.value = segmentsValue;
    console.log(event);

    if (this.sliderSteps.querySelector('.slider__step-active')) {
      this.sliderSteps.querySelector('.slider__step-active').classList.remove('slider__step-active');
    }
    this.sliderSteps.children[`${segmentsValue}`].classList.add('slider__step-active');
  }

  sliderDragAndDrop() {
    const sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderThumb = sliderThumb;
    const sliderProgress = this.elem.querySelector('.slider__progress');
    this.sliderProgress = sliderProgress;
    const sliderValue = this.elem.querySelector('.slider__value');
    this.sliderValue = sliderValue;

    sliderThumb.addEventListener('pointerdown', (event) => {
      this.elem.addEventListener('pointermove', this.sliderPointerMove(event));
    });
    




  }



  // sliderClick() {
  //   const sliderThumb = this.elem.querySelector('.slider__thumb');
  //   const sliderProgress = this.elem.querySelector('.slider__progress');
  //   const sliderValue = this.elem.querySelector('.slider__value');
  //   sliderThumb.ondragstart = () => false;

  //   this.elem.addEventListener('click', event => {
  //     let clickPoint = (event.clientX - this.elem.offsetLeft) / this.elem.offsetWidth;
  //     let clickSegmentsValue = clickPoint * this.segments;
  //     let segmentsValue = Math.round(clickSegmentsValue);
  //     let segmentsValuePercents = segmentsValue / this.segments * 100;
  //     sliderThumb.style.left = `${segmentsValuePercents}%`;
  //     sliderProgress.style.width = `${segmentsValuePercents}%`;
  //     sliderValue.textContent = `${segmentsValue}`;
  //     this.value = segmentsValue;

  //     if (this.sliderSteps.querySelector('.slider__step-active')) {
  //       this.sliderSteps.querySelector('.slider__step-active').classList.remove('slider__step-active');
  //     }
  //     this.sliderSteps.children[`${segmentsValue}`].classList.add('slider__step-active');

  //     this.elem.dispatchEvent(
  //       new CustomEvent('slider-change', {
  //         detail: this.value,
  //         bubbles: true
  //       })
  //     );
  //   });
  // }
}