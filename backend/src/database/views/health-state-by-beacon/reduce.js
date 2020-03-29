export default (key, values) => {
  const result = { count: 0 }

  const len = values.length

  for (let idx = 0; idx < len; idx += 1) {
    const { healthState, timestamp } = values[idx]
    result.count += 1

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
