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
    return `<tr>
                <td>${name}</td>
                <td>${age}</td>
                <td>${salary}</td>
                <td>${city}</td>
                <td><button>X</button></td>
    </tr>`;
  }

  createTableTemplate() {
    return `<table>
        <thead>
          <tr>
             <th>Имя</th>
              <th>Возраст</th>
               <th>Зарплата</th>
                <th>Город</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        ${this.rows.map(({ name, age, salary, city }) => this.createContentTemplate(name, age, salary, city)).join('')}
        </tbody>
    </table>`;
  }

  createTable() {
    const div = document.createElement('div');
    div.innerHTML = this.createTableTemplate();
    return div.firstElementChild;
  }

  addEventListener() {
    const tr = this._container.querySelectorAll('tr');
    tr.forEach(tr => tr.addEventListener('click',
      () => {
        if (event.target === tr.querySelector('button')) {
          event.currentTarget.remove();
        }
      }
    ), {once: true});
  }

  _render() {
    this._container = this.createTable();
    this.addEventListener();
  }

  get elem() {
    return this._container;
  }
}
