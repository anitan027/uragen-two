const isErrorEmpty = (obj) => {
  for (var x in obj) { return false }
  return true
}

const errorFocus = (errors) => {
  if (!isErrorEmpty(errors)) {
    let firstError = 1
    Object.entries(errors).forEach(([key, value]) => {
      if (value && firstError === 1) {
        document.querySelector('#'+key).focus()

        firstError++
      }
    })
  }
}

export { isErrorEmpty, errorFocus }