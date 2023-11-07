import { average } from '../utils/forTesting.js'

describe.skip('average', () => {
  test('of the one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many id calculated correctly', () => {
    expect(average([1, 2, 3, 4, 5, 6, 7])).toBe(4)
  })
})
