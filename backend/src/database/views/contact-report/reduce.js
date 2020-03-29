import findIndex from '../util/find-index.js'
import reduceProperties from '../util/reduce-properties.js'

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

  const reduceContacts = reduceProperties(reduceIntervals)

  if (rereduce) {
    return values.reduce(reduceContacts)
  } else {
    return values.map(doc2reduce).reduce(reduceContacts)
  }
}
