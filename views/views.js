export const contactReport = {
  map(doc, meta) {
    const { type, payload, timestamp: _timestamp } = doc
    if (type === 'contact') {
      const { beaconId, contactedBeaconId, timestamp = _timestamp } = payload
      emit([beaconId, contactedBeaconId, timestamp])
      emit([contactedBeaconId, beaconId, timestamp])
    }
  }
}
export const contactByBeacon = {
  map(doc, meta) {
    const { type, deviceId, payload, timestamp: _timestamp } = doc
    if (type === 'contact') {
      const { beaconId, contactedBeaconId, timestamp = _timestamp, distance } = payload
      emit(beaconId, { type: 'to', beaconId: contactedBeaconId, timestamp, deviceId, distance })
      emit(contactedBeaconId, { type: 'from', beaconId, timestamp, deviceId, distance })
    }
  }
}
