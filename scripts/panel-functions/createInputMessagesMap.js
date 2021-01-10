import {inputMessages} from './inputMessages.js'

export function createInputMessagesMap(panel) {

  const inputMessagesMap = new Map()

  for (let i = 0 ; i < panel.formInputs.length ; i++) {

    const msgSpan = document.createElement('span')
    msgSpan.classList.add(`form__validation-tip`)
    msgSpan.textContent = inputMessages[i]

    inputMessagesMap.set(panel.formInputs[i], msgSpan)
  }

  panel.inputMessagesMap = inputMessagesMap

}

