function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const btnRightCarousel = document.querySelector('.carousel__arrow_right');
  const btnLeftCarousel = document.querySelector('.carousel__arrow_left');
  const imagesCarousel = document.querySelector('.carousel__inner');

  let numOfSwitch = 0;
  if (numOfSwitch == 0) {btnLeftCarousel.style.display = 'none';}

  carousel.addEventListener('click', (event) => {
    for (let path of event.path) {
      if (path == btnRightCarousel) {
        numOfSwitch++;
        imagesCarousel.style.transform = `translateX(-${imagesCarousel.offsetWidth * numOfSwitch}px)`
        hiddenCarouselBtn();
      } else if (path == btnLeftCarousel) {
        imagesCarousel.style.transform = `translateX(${imagesCarousel.offsetWidth - (imagesCarousel.offsetWidth * numOfSwitch)}px)`
        numOfSwitch--;
        hiddenCarouselBtn();
      }
    }
    function hiddenCarouselBtn () {
      if (numOfSwitch <= 0) {
        btnLeftCarousel.style.display = 'none';
      } else if (numOfSwitch >= 3) {
        btnRightCarousel.style.display = 'none';
      } else {
        btnLeftCarousel.style.display = '';
        btnRightCarousel.style.display = '';
      }
    }
  });
}