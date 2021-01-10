export function formatInput(input) {

  if (input.dataset.input === `birthday`) {

    return input.valueAsNumber
  }

  return input.value.trim()

}

