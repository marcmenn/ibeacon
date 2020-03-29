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

const key = (beaconId, date) => [
  beaconId,
  date.getUTCFullYear(),
  date.getUTCMonth(),
  date.getUTCDate(),
]

export default (doc) => {
  const { type, payload, timestamp: serverTimestamp } = doc
  if (type === 'contact') {
    const { beaconId, contactedBeaconId, timestamp: clientTimestamp, distance = 10 } = payload
    const ms = parseTimestamp(clientTimestamp, serverTimestamp)
    const start = new Date(ms)

    emit(key(beaconId, start), { contact: contactedBeaconId, ms, distance })
    emit(key(contactedBeaconId, start), { contact: beaconId, ms, distance })
  }
}
