import {parseString} from './parseString.js'
import {addDeleteBtn} from './addDeleteBtn.js'

export function appendRows(panel, array = parseString(localStorage.rowsStr)) {

  if (array.length > 1) {

    panel.tbody.innerHTML = ``
    panel.rowsCustom.length = 0

    for (const entry of array) {

      const tr = document.createElement('tr')
      tr.classList.add(`panel-table`, `table__row`, `table__row_body`)

      for (const elem of Object.values(entry)) {

        const td = document.createElement('td')
        td.classList.add(`panel-table`, `table__col`, `table__col_body`)
        td.textContent = elem
        tr.append(td)
      }

      panel.tbody.append(tr)
      panel.rowsCustom.push(tr)
    }
  }

  if (array.length === 1) {

    const [entry] = array

    const tr = document.createElement('tr')
    tr.classList.add(`panel-table`, `table__row`, `table__row_body`)

    for (const elem of Object.values(entry)) {

      const td = document.createElement('td')
      td.classList.add(`panel-table`, `table__col`, `table__col_body`)
      td.textContent = elem
      tr.append(td)
    }

    panel.tbody.append(tr)
    panel.rowsCustom.push(tr)
  }

  addDeleteBtn(panel)
}
