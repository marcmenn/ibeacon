export default (doc) => {
  const { type, payload, timestamp: serverTimestamp, beaconId: serverBeaconId } = doc
  if (type === 'health-state') {
    const { healthState, timestamp: clientTimestamp, beaconId: clientBeaconId } = payload
    let ms
    try {
      ms = (new Date(serverTimestamp)).getTime()
    } catch (e) {
      ms = (new Date(clientTimestamp)).getTime()
    }
    const start = new Date(ms)
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
