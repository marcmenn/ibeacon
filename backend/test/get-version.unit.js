import { getVersion } from '../src/get-version'

describe('getVersion', () => {
  test('return version number', () => {
    const version = getVersion()
    const numbers = version.split('.').map(Number.parseInt)

    expect(numbers.length).toBe(3)
    expect(numbers[0]).toBeGreaterThanOrEqual(1)
  })
})
