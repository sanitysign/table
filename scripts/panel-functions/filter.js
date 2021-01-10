import initialString from './initialString.js'
import {appendRows} from './appendRows.js'
import {parseInitialString} from './parseInitialString.js'
import {parseString} from './parseString.js'
import {addDeleteBtn} from './addDeleteBtn.js'

export function filter(panel, mode = `remove`) {

  panel.filterEntries.length = 0

  if (!localStorage.rowsStr) {
    appendRows(panel, parseInitialString(initialString))
  } else {
    appendRows(panel, parseString(localStorage.rowsStr))
  }

  panel.rowsCustom.forEach(row => {
    row.classList.remove(`faded`)
  })

  if (mode === `remove` || mode !== `fade`) {

    for (const input of panel.filterInputs) {

      panel.filterEntries.push(input.value)
    }

    for (let i = 0 ; i < panel.filterEntries.length - 2 ; i++) {

      if (panel.filterEntries[i].trim() === ``) continue

      for (const row of panel.rowsCustom) {

        if (row.cells[i].textContent.toLowerCase().includes(panel.filterEntries[i].toLowerCase())) continue

        row.remove()
      }
    }

    if (panel.filterEntries[2].trim().length === 4) {
      for (const row of panel.rowsCustom) {

        if (row.cells[3].textContent.split(`-`)[0].trim() !== panel.filterEntries[2] ) row.remove()

      }
    }

    if (panel.filterEntries[3].trim().length === 4) {
      for (const row of panel.rowsCustom) {

        if (row.cells[3].textContent.split(`-`)[1].split(` `)[0].trim() !== panel.filterEntries[3] ) row.remove()

      }
    }

  }

  if (mode === `fade`) {

    for (const input of panel.filterInputs) {

      panel.filterEntries.push(input.value)
    }

    for (let i = 0 ; i < panel.filterEntries.length - 2; i++) {

      if (panel.filterEntries[i].trim() === ``) continue

      for (const row of panel.rowsCustom) {

        if (row.cells[i].textContent.toLowerCase().includes(panel.filterEntries[i].toLowerCase())) continue

        row.classList.add(`faded`)
      }
    }

    if (panel.filterEntries[2].trim().length === 4) {
      for (const row of panel.rowsCustom) {

        if (row.cells[3].textContent.split(`-`)[0].trim() !== panel.filterEntries[2] ) row.classList.add(`faded`)

      }
    }

    if (panel.filterEntries[3].trim().length === 4) {
      for (const row of panel.rowsCustom) {

        if (row.cells[3].textContent.split(`-`)[1].split(` `)[0].trim() !== panel.filterEntries[3] ) row.classList.add(`faded`)

      }
    }
  }

  addDeleteBtn(panel)

}

