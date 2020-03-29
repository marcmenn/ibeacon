/* eslint-disable no-param-reassign */
export default (reducer) => (result, value) => {
  for (const contact of Object.keys(value)) {
    result[contact] = value[contact].reduce(reducer, result[contact] || [])
  }
  return result
}
