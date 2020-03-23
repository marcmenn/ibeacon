const parseTimestamp = (...args) => {
  for (const x of args) {
    try {
      return new Date(x).getTime()
    } catch (e) {}
  }
  return 0
}

export default (doc, meta) => {
  const { type, payload, timestamp: serverTimestamp } = doc
  if (type === 'contact') {
    const { beaconId, contactedBeaconId, timestamp: clientTimestamp, distance = 10 } = payload
    const ms = parseTimestamp(clientTimestamp, serverTimestamp)
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
}
