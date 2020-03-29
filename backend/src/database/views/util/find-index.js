export default (array, predicate) => {
  for (let i = 0; i < array.length; i += 1) {
    if (predicate(array[i])) return i
  }
  return -1
}
