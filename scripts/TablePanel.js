import initialString from './panel-functions/initialString.js'
import {appendRows} from './panel-functions/appendRows.js'
import {parseInitialString} from './panel-functions/parseInitialString.js'
import {parseString} from './panel-functions/parseString.js'
import {sortRows} from './panel-functions/sortRows.js'
import {changeFiltersWidth} from './panel-functions/changeFiltersWidth.js'
import {makeVisible} from './panel-functions/makeVisible.js'
import {filter} from './panel-functions/filter.js'
import {checkToggler} from './panel-functions/checkToggler.js'
import {validateInput} from './panel-functions/validateInput.js'
import {formatInput} from './panel-functions/formatInput.js'
import {createInputMessagesMap} from './panel-functions/createInputMessagesMap.js'
import {saveIntoLocalStorage} from './panel-functions/saveIntoLocalStorage.js'
import {addDeleteBtn} from './panel-functions/addDeleteBtn.js'
import {deleteRow} from './panel-functions/deleteRow.js'

export class TablePanel {

  constructor(name) {

    this.name = name
    this.panel = document.querySelector('.panel')
    this.form = this.panel.querySelector('.panel__form')
    this.formInputs = this.form.querySelectorAll('.form__input')
    this.formInputBirthday = this.form.querySelector('[data-input="birthday"]')
    this.formInputBirthdayPlaceholder = this.form.querySelector('.form__date-placeholder')
    this.toggler = this.panel.querySelector('.toggle__input')
    this.filters = this.panel.querySelectorAll('.panel__filter-wrap')
    this.filterInputs = this.panel.querySelectorAll('.panel__filter')
    this.tableContainer = this.panel.querySelector('.panel__table-wrap')
    this.table = this.panel.querySelector('.panel__table')
    this.headers = this.panel.querySelectorAll('.table__head .table__col_head')
    this.tbody = this.panel.querySelector('.table__body')

    this.rowsCustom = []
    this.filterEntries = []
    this.formInputValues = []
    this.timeoutVisibility = null
    this.timeoutInput = null
    this.timeoutResize = null
    this.DELAY_VISIBILITY = 500
    this.DELAY_INPUT = 300
    this.RESIZE_DELAY = 200
    this.BIRTHDAY_MIN = "1900-01-01"
    this.FORM_PLACEHOLDER_COLOR = getComputedStyle(this.formInputBirthdayPlaceholder).color
    this.FORM_VALUE_COLOR = getComputedStyle(this.formInputs[0]).color

    this.formInputBirthday.setAttribute("min", this.BIRTHDAY_MIN)
    this.formInputBirthday.setAttribute("max", JSON.stringify(new Date()).slice(1, 11))

    if (!localStorage.rowsStr) {
      console.log(`created localStorage.rowsStr entry`)
      appendRows(this, parseInitialString(initialString))
    } else {
      appendRows(this, parseString(localStorage.rowsStr))
    }

    changeFiltersWidth(this)

    makeVisible(this)

    createInputMessagesMap(this)

    this.panel.oninput = (e) => {

      if (!e.target.dataset.filter) return

      clearTimeout(this.timeoutInput)

      this.timeoutInput = setTimeout(() => {
        filter(this, checkToggler(this))
      }, this.DELAY_INPUT)

    }

    this.tableContainer.onclick = (e) => {

      if (!e.target.dataset.delete) return

      for (let [row, button] of this.deleteMap) {

        if (e.target === button) {

          deleteRow(this, row)

          addDeleteBtn(this)

          return
        }
      }
    }

    this.toggler.onchange = () => {

      filter(this, checkToggler(this))
    }

    this.table.onclick = (e) => {

      if(!e.target.dataset.sort) return

      if (+e.target.dataset.sort === 0 || 1) {
        sortRows(this, +e.target.dataset.sort, `string`)
      }

      if (+e.target.dataset.sort === 2) {
        sortRows(this, +e.target.dataset.sort, `birthday`)
      }

      if (+e.target.dataset.sort === 3) {
        sortRows(this, +e.target.dataset.sort, `admission`)
      }

      addDeleteBtn(this)
    }

    window.onresize = () => {

      clearTimeout(this.timeoutResize)
      
      this.timeoutResize = setTimeout(() => addDeleteBtn(this), this.RESIZE_DELAY)
    }

    this.formInputBirthday.oninput = (e) => {

      if(this.formInputBirthday.value.trim() !== ``) {

        this.formInputBirthdayPlaceholder.textContent = this.formInputBirthday.value
        this.formInputBirthdayPlaceholder.style.color = this.FORM_VALUE_COLOR
      } else {

        this.formInputBirthdayPlaceholder.textContent = `Birthday`
        this.formInputBirthdayPlaceholder.style.color = this.FORM_PLACEHOLDER_COLOR
      }
    }

    this.form.oninput = (e) => {

      if (!e.target.dataset.input) return

      if (!this.inputMessagesMap) return

      if (!this.inputMessagesMap.get(e.target)) return

      this.inputMessagesMap.get(e.target).remove()

    }

    this.form.onsubmit = (e) => {

      e.preventDefault()

      this.formInputValues.length = 0

      for (const input of this.formInputs) {

        if (validateInput(input, this)) {

          this.formInputValues.push(formatInput(input))

        } else {

          input.parentElement.append(this.inputMessagesMap.get(input))
        }
      }

      if (this.formInputValues.length === 6) {

        let [firstname, surname, patronym, birthday, admission, faculty] = this.formInputValues

        const correctStr = JSON.stringify({surname, firstname, patronym, faculty, birthday, admission})

        appendRows(this, parseString(correctStr))

        saveIntoLocalStorage(this)

        for (const input of this.formInputs) {

          input.value = ``
        }

        this.formInputBirthdayPlaceholder.textContent = `Birthday`
        this.formInputBirthdayPlaceholder.style.color = `rgb(165, 165, 165)`
      }

    }

  }
}


