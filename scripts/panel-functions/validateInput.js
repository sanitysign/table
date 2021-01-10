export function validateInput(input, panel) {

  const letters = /^[A-Za-zа-яёА-ЯЁ]+$/
  const numbers = /^[0-9]+$/
  const value = input.value.trim()

  if (input.dataset.input === `name`) return value.length >=2 && value.match(letters) ? true : false

  if (input.dataset.input === `text`) return value.length >=5 ? true : false

  if (input.dataset.input === `birthday`) return value ? true : false

  if (input.dataset.input === `year`) {

    return value.match(numbers) && +value >= 2000 && +value <= new Date().getFullYear() ? true : false
  }

  return true

}

