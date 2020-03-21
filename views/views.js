export const contactReport = {
  map(doc, meta) {
    const { type, deviceId, payload, timestamp: _timestamp } = doc
    if (type === 'contact') {
      const { beaconId, contactedBeaconId, timestamp = _timestamp } = payload
      emit([beaconId, contactedBeaconId, timestamp])
      emit([contactedBeaconId, beaconId, timestamp])
    }
  }
}
