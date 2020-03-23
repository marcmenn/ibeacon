export default (key, values, rereduce) => {
  const doc2reduce = ({ beaconId, ms, healthState }) => {
    const result = {}
    result[beaconId] = [{
      ms,
      healthState,
    }]
    return result
  }

  const findIndex = (array, predicate) => {
    for (let i = 0; i < array.length; i += 1) {
      if (predicate(array[i])) return i;
    }
    return -1
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

  const reduceContacts = (result, value) => {
    for (const contact in value) {
      if (Object.prototype.hasOwnProperty.call(value, contact)) {
        result[contact] = value[contact].reduce(reduceHealthState, result[contact] || [])
      }
    }
    return result
  }

  if (rereduce) {
    return values.reduce(reduceContacts)
  } else {
    return values.map(doc2reduce).reduce(reduceContacts)
  }
}
