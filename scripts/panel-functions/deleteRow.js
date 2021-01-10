import {addDeleteBtn} from './addDeleteBtn.js'
import {saveIntoLocalStorage} from './saveIntoLocalStorage.js'


export function deleteRow(panel, row) {

  if (confirm(`Delete Entry?`)) {

    for (let i = 0 ; i < panel.rowsCustom.length ; i++) {

      if (panel.rowsCustom[i] === row) {

        panel.rowsCustom.splice(i, 1)

        row.remove()

        break
      }
    }

    addDeleteBtn(panel)

    saveIntoLocalStorage(panel)

  }

}

