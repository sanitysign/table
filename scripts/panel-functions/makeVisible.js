export function makeVisible(panel) {

  clearTimeout(panel.timeoutVisibility)

  panel.timeoutVisibility = setTimeout(() => {
    panel.panel.classList.remove(`transparent`)
  }, panel.DELAY_VISIBILITY) 

}

