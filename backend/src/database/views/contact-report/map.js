const parseTimestamp = (...args) => {
  for (const x of args) {
    try {
      return new Date(x).getTime()
    } catch (e) {
      // ignore
    }
  }
  return 0
}

export default (doc) => {
  const { type, payload, timestamp: serverTimestamp } = doc
  if (type === 'contact') {
    const { beaconId, contactedBeaconId, timestamp: clientTimestamp, distance = 10 } = payload
    const ms = parseTimestamp(clientTimestamp, serverTimestamp)
    const start = new Date(ms)

    const emitEvents = (id, contact) => {
      emit([id, start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()], {
        contact,
        ms,
        distance,
      })
    }
    emitEvents(beaconId, contactedBeaconId)
    emitEvents(contactedBeaconId, beaconId)
  }
}
