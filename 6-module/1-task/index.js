export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }

  render() {
    const elTable = document.createElement('TABLE');

    const tableHead = `<thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>`;
    
    const rowsItem = this.rows.map(item => {
      return `<tr>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.salary}</td>
            <td>${item.city}</td>
            <td><button>X</button></td>
        </tr>`;
    }).join('');

    const fullTable = tableHead + '<tbody>' + rowsItem + '</tbody>';
    elTable.insertAdjacentHTML('beforeend', fullTable);

    elTable.addEventListener('click', event => {
      if (event.target.closest('button')) {
        event.target.closest('tr').remove();
      }
    });
    return elTable;
  } 
}