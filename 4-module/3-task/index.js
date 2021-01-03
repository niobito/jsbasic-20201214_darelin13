/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  const rows = table.querySelectorAll('tbody > tr:nth-child(n+1)');
  rows.forEach(item => {
    const cell = item.querySelectorAll('td');

    if (cell[3].dataset.available === undefined) {
      item.setAttribute('hidden', 'true');
    } else {
      cell[3].dataset.available === 'true' ? item.classList.add('available') : item.classList.add('unavailable');
    }

    cell[2].textContent === 'm' ?
      item.classList.add('male') : item.classList.add('female');

    if (Number(cell[1].textContent) < 18) {
      item.style.textDecoration = 'line-through';
    }
  });
}
