export default (key, values, rereduce) => {
  const INTERVAL = 10 * 60000 // amount of minutes for grouping events
  const doc2reduce = ({ contact, ms, distance }) => {
    const result = {}
    result[contact] = [{
      start: ms,
      end: ms,
      n: 1,
      minDistance: distance,
      maxDistance: distance,
      sumDistance: distance,
    }]
    return result
  }

  const findIndex = (array, predicate) => {
    for (let i = 0; i < array.length; i += 1) {
      if (predicate(array[i])) return i;
    }
    return -1
  }

  const reduceIntervals = (result, value) => {
    const i = findIndex(result, (interval) => value.start <= interval.end + INTERVAL)
    if (i < 0) {
      result.push(value)
    } else {
      const interval = result[i]
      if (interval.start > value.end + INTERVAL) {
        result.splice(i, 0, value)
      } else {
        interval.start = Math.min(interval.start, value.start)
        interval.end = Math.max(interval.end, value.end)
        interval.n += 1
        interval.minDistance = Math.min(interval.minDistance, value.minDistance)
        interval.maxDistance = Math.max(interval.maxDistance, value.maxDistance)
        interval.sumDistance += value.sumDistance
      }
    }
    return result
  }

  const reduceContacts = (result, value) => {
    for (const contact in value) {
      if (Object.prototype.hasOwnProperty.call(value, contact)) {
        result[contact] = value[contact].reduce(reduceIntervals, result[contact] || [])
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
