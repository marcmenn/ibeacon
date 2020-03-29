/* eslint-disable no-bitwise */
export default (array, element, compareFunction) => {
  let m = 0
  let n = array.length - 1
  while (m <= n) {
    const k = (n + m) >> 1
    const cmp = compareFunction(element, array[k])
    if (cmp > 0) {
      m = k + 1
    } else if (cmp < 0) {
      n = k - 1
    } else {
      return k
    }
  }
  return -m - 1
}
