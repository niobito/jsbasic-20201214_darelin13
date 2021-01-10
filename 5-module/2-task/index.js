function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');

  button.addEventListener('click', () => {
    text.hidden ? text.removeAttribute('hidden') : text.setAttribute('hidden', 'true');
  });
}
