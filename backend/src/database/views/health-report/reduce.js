import findIndex from '../util/find-index.js'
import reduceProperties from '../util/reduce-properties.js'

const doc2reduce = (beaconId) => ({ ms, healthState }) => {
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
    result.splice(i, 0, value)
  }
  return result
}

const reduceContacts = reduceProperties(reduceHealthState)

export default (key, values, rereduce) => (rereduce
  ? values.reduce(reduceContacts)
  : values.map(doc2reduce(key[0])).reduce(reduceContacts)
)
