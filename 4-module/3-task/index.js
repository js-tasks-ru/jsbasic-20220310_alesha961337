function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[3].getAttribute('data-available') === 'true') {
      table.rows[i].className += ' available';
    } else if (table.rows[i].cells[3].getAttribute('data-available') === 'false') {
      table.rows[i].className += ' unavailable';
    } else {table.rows[i].hidden = true;}
  }

  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[2].innerHTML === 'm') {
      table.rows[i].className += ' male';
    } else if (table.rows[i].cells[2].innerHTML === 'f') {
      table.rows[i].className += ' female';
    }
  }

  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[1].innerHTML < 18) {
      table.rows[i].style.textDecoration = 'line-through';
    }
  }
}
