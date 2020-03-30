import chai from 'chai'

import binarySearch from '../../src/utility/binary-search.js'

const { expect } = chai

export default class View {
  constructor(map, reduce) {
    this.implMap = map
    this.implReduce = reduce
    this.clear()
  }

  clear() {
    this.emitted = []
    this.sorted = true
  }

  map(doc) {
    try {
      global.emit = (key, value) => {
        expect(key).to.be.an('array')
        this.rows(key, true).push(value)
      }
      this.implMap(doc)
    } finally {
      delete global.emit
    }
  }

  rows(key, create = false) {
    const compare = (a, { key: b }) => {
      const n = Math.min(a.length, b.length)
      for (let i = 0; i < n; i += 1) {
        if (a[i] < b[i]) return -1
        if (a[i] > b[i]) return 1
      }
      if (a.length < b.length) return -1
      if (a.length > b.length) return 1
      return 0
    }

    const index = binarySearch(this.emitted, key, compare)
    if (index >= 0) {
      return this.emitted[index].values
    }
    if (create) {
      const values = []
      this.emitted.splice(1 - index, 0, { key, values })
      return values
    }
    return []
  }

  reduce(key) {
    const rows = this.rows(key)
    return this.implReduce(key, rows, false)
  }

  get size() {
    let size = 0
    for (const slot of this.emitted) {
      size += slot.values.length
    }
    return size
  }
}
