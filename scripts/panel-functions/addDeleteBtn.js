export function addDeleteBtn(panel) {

  const containerTop = panel.tableContainer.getBoundingClientRect().top

  if (panel.deleteMap) {

    for (const button of panel.deleteMap.values()) {

      button.remove()
    }
  }

  panel.deleteMap = new Map()

  for (const row of panel.rowsCustom) {

    const rowCenter = row.getBoundingClientRect().top + row.getBoundingClientRect().height / 2

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add(`panel-table`, `table__delete`)
    deleteBtn.textContent = `\u2715`;
    deleteBtn.dataset.delete = "true"
    deleteBtn.style.top = rowCenter - containerTop + `px`
    panel.tableContainer.append(deleteBtn)
    panel.deleteMap.set(row, deleteBtn)
  }

}

