export default (reducer) => (result, value) => {
  for (const contact in value) {
    if (Object.prototype.hasOwnProperty.call(value, contact)) {
      result[contact] = value[contact].reduce(reducer, result[contact] || [])
    }
  }
  return result
}
