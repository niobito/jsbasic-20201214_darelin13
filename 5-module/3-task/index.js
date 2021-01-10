function initCarousel() {
  const buttonRight = document.querySelector('.carousel__arrow_right');
  const buttonLeft = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselWidth = carouselInner.offsetWidth;
  const picturePosition = ['', `translateX(-${carouselWidth}px)`,
    `translateX(-${carouselWidth * 2}px)`, `translateX(-${carouselWidth * 3}px)`];
  let pictureCounter = 0;

  function hideButton(pictureCounter) {
    pictureCounter === 0 ? buttonLeft.style.display = 'none' : buttonLeft.style.display = '';
    pictureCounter === 3 ? buttonRight.style.display = 'none' : buttonRight.style.display = '';
  }

  hideButton(pictureCounter);

  buttonRight.addEventListener('click', () => {
    ++pictureCounter;
    carouselInner.style.transform = `${picturePosition[pictureCounter]}`;
    hideButton(pictureCounter);
  });

  buttonLeft.addEventListener('click', () => {
    --pictureCounter;
    carouselInner.style.transform = `${picturePosition[pictureCounter]}`;
    hideButton(pictureCounter);
  });
}
