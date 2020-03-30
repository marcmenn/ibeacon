import parseTimestamp from '../util/parse-timestamp.js'

export const key = (beaconId, date) => [
  beaconId,
  date.getUTCFullYear(),
  date.getUTCMonth(),
  date.getUTCDate(),
]

export default (doc) => {
  const { type, payload, timestamp: serverTimestamp } = doc
  if (type === 'contact') {
    const { beaconId, contactedBeaconId, timestamp: clientTimestamp, distance = 10 } = payload
    const start = parseTimestamp(clientTimestamp, serverTimestamp)
    const ms = start.getTime()

    emit(key(beaconId, start), { contact: contactedBeaconId, ms, distance })
    emit(key(contactedBeaconId, start), { contact: beaconId, ms, distance })
  }
}
