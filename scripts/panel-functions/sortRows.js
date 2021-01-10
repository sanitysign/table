import {saveIntoLocalStorage} from './saveIntoLocalStorage.js'

export function sortRows(panel, index, sorting = `string`) {

  panel.filterInputs.forEach(input => input.value = ``)

  panel.rowsCustom.forEach(row => {
    row.classList.remove(`faded`)
  })



  if (sorting === `string` || sorting !== `birthday` || sorting !== `admission`) {
    panel.rowsCustom.sort((row1, row2) => {

      const text1 = row1.cells[index].textContent
      const text2 = row2.cells[index].textContent

      return text1.localeCompare(text2)
    })
  }

  if (sorting === `birthday`) {
    panel.rowsCustom.sort((row1, row2) => {

      const [dd1, mm1, yy1] = row1.cells[index].textContent
                      .split(` `)[0]
                      .split(`.`)

      const [dd2, mm2, yy2] = row2.cells[index].textContent
                      .split(` `)[0]
                      .split(`.`)

      const date1 = new Date(yy1, mm1, dd1).getTime()
      const date2 = new Date(yy2, mm2, dd2).getTime()

      return date1 - date2
    })
  }

  if (sorting === `admission`) {
    panel.rowsCustom.sort((row1, row2) => {

      const year1 = +row1.cells[index].textContent
                      .split(` `)[0]
                      .split(`-`)[0]

      const year2 = +row2.cells[index].textContent
                      .split(` `)[0]
                      .split(`-`)[0]

      return year1 - year2
    })
  }

  for (const row of panel.rowsCustom) {
    panel.tbody.append(row)
  }

  saveIntoLocalStorage(panel)

}


