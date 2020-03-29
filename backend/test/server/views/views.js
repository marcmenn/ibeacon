export const emitted = []
let byKey = {}

const strKey = (key) => key.join('-')

export const emittedValueByKey = (key) => byKey[strKey(key)]

export const createGlobalEmit = () => {
  global.emit = (key, value) => {
    emitted.push({ key, value })
    byKey[strKey(key)] = value
  }
  emitted.length = 0
  byKey = {}
}

export const deleteGlobalEmit = () => {
  delete global.emit
}
