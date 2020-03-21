import chai from 'chai'
import { getVersion } from '../src/get-version.js'

const { expect } = chai

describe('getVersion', () => {
  it('return version number', () => {
    const version = getVersion()
    const numbers = version.split('.').map(Number.parseInt)

    expect(numbers).to.have.lengthOf(3)
    expect(numbers[0]).to.be.at.least(1)
  })
})
