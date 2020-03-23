export default (doc) => {
  const { type, beaconId, payload, timestamp: _timestamp } = doc

  if (type === 'health-state') {
    const { healthState, timestamp = _timestamp } = payload
    emit(beaconId, { healthState, timestamp })
  }
}
