import findIndex from '../util/find-index.js'
import reduceProperties from '../util/reduce-properties.js'

export default (key, values, rereduce) => {
  const doc2reduce = ({ beaconId, ms, healthState }) => {
    const result = {}
    result[beaconId] = [{
      ms,
      healthState,
    }]
    return result
  }

  const reduceHealthState = (result, value) => {
    const i = findIndex(result, (interval) => value.ms <= interval.ms)
    if (i < 0) {
      result.push(value)
    } else {
      const interval = result[i]
      result.splice(i, 0, value)
    }
    return result
  }

  const reduceContacts = reduceProperties(reduceHealthState)

  if (rereduce) {
    return values.reduce(reduceContacts)
  } else {
    return values.map(doc2reduce).reduce(reduceContacts)
  }
}
