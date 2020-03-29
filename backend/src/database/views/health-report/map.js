import parseTimestamp from '../util/parse-timestamp.js'

export default (doc) => {
  const { type, payload, timestamp: serverTimestamp, beaconId: serverBeaconId } = doc
  if (type === 'health-state') {
    const { healthState, timestamp: clientTimestamp, beaconId: clientBeaconId } = payload
    const start = parseTimestamp(clientTimestamp, serverTimestamp)
    const ms = start.getTime()
    const beaconId = serverBeaconId || clientBeaconId

    if (beaconId) {
      emit([beaconId, start.getUTCFullYear(), start.getUTCMonth()], {
        beaconId,
        ms,
        healthState,
      })
    }
  }
}
