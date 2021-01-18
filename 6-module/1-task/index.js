/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: '',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this._container = null;

    this._render();
  }

  createContentTemplate(name, age, salary, city) {
    return `<tr><td>${name}</td><td>${age}</td><td>${salary}</td><td>${city}</td><td><button>X</button></td></tr>`;
  }

  get _header() {
    return `<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr>`;
  }

  get _thead() {
    const thead = document.createElement('thead');
    thead.innerHTML = this._header;
    return thead;
  }

  get _tbody() {
    const tbody = document.createElement('tbody');
    tbody.innerHTML = this.rows.map(({ name, age, salary, city }) =>
      this.createContentTemplate(name, age, salary, city)).join('');
    return tbody;
  }

  get _table() {
    const table = document.createElement('table');
    table.append(this._thead);
    table.append(this._tbody);
    return table;
  }

  addEventListener() {
    const button = this._container.querySelectorAll('button');
    const tr = this._container.querySelectorAll('tr');
    button.forEach(button => button.addEventListener('click', () => {}));
    tr.forEach(tr => tr.addEventListener('click',
      () => {
        if (event.target === this._container.querySelector('button')) {
          event.currentTarget.remove();
        }
      }
    ));
  }

  _render() {
    this._container = document.createElement('div');
    this._container.append(this._table);
    this.addEventListener();
  }

  get elem() {
    return this._container;
  }
}
