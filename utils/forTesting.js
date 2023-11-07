export const palindrome = (string) => {
  return string.split('').reverse('').join('')
}

export const average = (array) => {
  let sum = 0

  array.forEach(item => {
    sum += item
  })

  return sum / array.length
}
