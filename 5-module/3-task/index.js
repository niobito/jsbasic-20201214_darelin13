function initCarousel() {
  const buttonRight = document.querySelector('.carousel__arrow_right');
  const buttonLeft = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');
  const pictureValue = document.querySelectorAll('.carousel__slide').length;
  const carouselWidth = carouselInner.offsetWidth;
  let pictureCounter = 0;

  function hideButton(pictureCounter) {
    pictureCounter === 0 ? buttonLeft.style.display = 'none' : buttonLeft.style.display = '';
    pictureCounter === pictureValue - 1 ? buttonRight.style.display = 'none' : buttonRight.style.display = '';
  }

  function translateValue(pictureCounter) {
    return `translateX(-${carouselWidth * pictureCounter}px)`;
  }

  hideButton(pictureCounter);

  buttonRight.addEventListener('click', () => {
    ++pictureCounter;
    carouselInner.style.transform = translateValue(pictureCounter);
    hideButton(pictureCounter);
  });

  buttonLeft.addEventListener('click', () => {
    --pictureCounter;
    carouselInner.style.transform = translateValue(pictureCounter);
    hideButton(pictureCounter);
  });
}
