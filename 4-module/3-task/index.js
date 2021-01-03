/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  const rows = table.querySelectorAll('tbody > tr:nth-child(n+1)');
  rows.forEach(item => {
    const cell = item.querySelectorAll('td');

    if (cell[3].dataset.available === 'true') {
      item.classList.add('available');
    } else if (cell[3].dataset.available === 'false') {
      item.classList.add('unavailable');
    } else {
      item.setAttribute('hidden', 'true');
    }

    if (cell[2].textContent === 'm') {
      item.classList.add('male');
    } else {
      item.classList.add('female');
    }

    if (Number(cell[1].textContent) < 18) {
      item.style.textDecoration = 'line-through';
    }
  });
}
