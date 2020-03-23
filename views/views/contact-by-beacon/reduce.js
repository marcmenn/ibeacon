export default (key, values) => {
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
