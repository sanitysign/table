export function changeFiltersWidth(panel) {

  const tableWidth = panel.table.getBoundingClientRect().width

  for (let i = 0 ; i < panel.filters.length ; i++) {

    const collWidth = panel.headers[i].getBoundingClientRect().width

    panel.filters[i].style.flex = `1 1 ${collWidth * 100 / tableWidth}%`
  }
}


