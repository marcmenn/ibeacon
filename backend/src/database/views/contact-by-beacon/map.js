export default (doc) => {
  const { type, beaconId, payload, timestamp: _timestamp } = doc

  if (type === 'contact') {
    const { contactedBeaconId, timestamp = _timestamp, distance } = payload
    emit(beaconId, { direction: 'to', beaconId: contactedBeaconId, timestamp, distance })
    emit(contactedBeaconId, { direction: 'from', beaconId, timestamp, distance })
  }
}
