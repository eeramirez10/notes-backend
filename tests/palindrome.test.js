import { palindrome } from '../utils/forTesting.js'

test.skip('Palindrome de Zadquiel', () => {
  const result = palindrome('Zadquiel')

  expect(result).toBe('leiuqdaZ')
})
