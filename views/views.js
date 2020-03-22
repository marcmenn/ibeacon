export const contactReport = {
  map(doc, meta) {
    const { type, payload, timestamp: serverTimestamp } = doc
    if (type === 'contact') {
      const { beaconId, contactedBeaconId, timestamp: clientTimestamp, distance = 10 } = payload
      let ms
      try {
        ms = (new Date(clientTimestamp)).getTime()
      } catch (e) {
        ms = (new Date(serverTimestamp)).getTime()
      }
      const start = new Date(ms)

      const emitEvents = (beaconId, contactedBeaconId) => {
        emit([beaconId, start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()], {
          contact: contactedBeaconId,
          ms,
          distance,
        })
      }
      emitEvents(beaconId, contactedBeaconId)
      emitEvents(contactedBeaconId, beaconId)
    }
  },

  reduce(key, values, rereduce) {
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
}

export const contactByBeacon = {
  map(doc) {
    const { type, payload, timestamp: _timestamp } = doc

    if (type === 'contact') {
      const { beaconId, contactedBeaconId, timestamp = _timestamp, distance } = payload
      emit(beaconId, { direction: 'to', beaconId: contactedBeaconId, timestamp, distance })
      emit(contactedBeaconId, { direction: 'from', beaconId, timestamp, distance })
    }
  },
  reduce(key, values) {
    const result = {
      count: 0,
      infoByBeaconId: {}
    }

    const len = values.length

    for (let idx = 0; idx < len; idx += 1) {
      const { direction, beaconId, timestamp, distance } = values[idx]
      result.count = result.count + 1

      const info = result.infoByBeaconId[beaconId] || {
        count: 0,
        distanceCount: 0,
        distanceSum: 0,
        countByDirection: {}
      }
      result.infoByBeaconId[beaconId] = info
      info.count = info.count + 1

      if (direction) {
        info.countByDirection[direction] = 1 + (info.countByDirection[direction] || 0)
      }

      if (timestamp) {
        if (!info.minTimestamp || info.minTimestamp > timestamp) {
          info.minTimestamp = timestamp
        }

        if (!info.maxTimestamp || info.maxTimestamp < timestamp) {
          info.maxTimestamp = timestamp
        }
      }

      if (distance != null) {
        info.distanceCount = info.distanceCount + 1
        info.distanceSum = info.distanceSum + distance

        if (!info.minDistance || info.minDistance > distance) {
          info.minDistance = distance
        }

        if (!info.maxDistance || info.maxDistance < distance) {
          info.maxDistance = distance
        }
      }
    }

    return result
  }
}

export const healthStateByBeacon = {
  map(doc) {
    const { type, beaconId, payload, timestamp: _timestamp } = doc

    if (type === 'health-state') {
      const { healthState, timestamp = _timestamp } = payload
      emit(beaconId, { healthState, timestamp })
    }
  },
  reduce(key, values) {
    const result = { count: 0 }

    const len = values.length

    for (let idx = 0; idx < len; idx += 1) {
      const { healthState, timestamp } = values[idx]
      result.count = result.count + 1

      if (healthState && timestamp) {
        if (!result.firstTimestamp || result.firstTimestamp > timestamp) {
          result.firstTimestamp = timestamp
          result.firstHealthState = healthState
        }

        if (!result.lastTimestamp || result.lastTimestamp < timestamp) {
          result.lastTimestamp = timestamp
          result.lastHealthState = healthState
        }
      }
    }

    return result
  }
}
