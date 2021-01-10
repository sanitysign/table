export function saveIntoLocalStorage(panel) {

  let rowsArr = []

  for (const row of panel.rowsCustom) {

    const cellsText = []

    for (const cell of row.cells) {
      cellsText.push(cell.textContent)
    }

    let [fullname, faculty, birthday, study] = cellsText

    let [surname, firstname, patronym] = fullname
                                            .split(` `)
                                            .map(word => word.trim())

    faculty = faculty.trim()

    const [dd, mm, yy] = birthday
                          .split(` `)[0]
                          .split(`.`)
                          .map(word => word.trim())
                          .map(word => {

                            return word[0] === `0` ? word.slice(1) : word
                          })

    birthday = new Date(yy, mm - 1, dd).getTime()

    const admission = study
                    .split(`-`)[0]
                    .trim()

    rowsArr.push({
      surname,
      firstname,
      patronym,
      faculty,
      birthday,
      admission,
    })
  }

  localStorage.setItem(`rowsStr`, JSON.stringify(rowsArr))
}

