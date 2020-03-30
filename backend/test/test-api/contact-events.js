const ts = (date) => new Date(date).toISOString()

const event = (
  serverTimestamp,
  beaconId,
  contactedBeaconId,
  distance = 10,
  clientTimestamp = serverTimestamp,
) => {
  const type = 'contact'
  const payload = { beaconId, contactedBeaconId, timestamp: ts(clientTimestamp), distance }
  return { type, payload, timestamp: ts(serverTimestamp) }
}

export default (view, date, spec) => {
  const result = []
  const base = new Date(date).getTime()
  const regex = /^((?:\d+\.)?\d+)(?:\/((?:\d+\.)?\d+))?:(\w+)-(\w+)(?:\(((?:\d+\.)?\d+)\))?$/mg
  const fromMinutes = (minutes) => base + Number.parseFloat(minutes) * 60000
  let match
  // eslint-disable-next-line no-cond-assign
  while (match = regex.exec(spec)) {
    const [, serverMinutes, clientMinutes, a, b, distance] = match
    const serverTimestamp = fromMinutes(serverMinutes)
    const clientTimestamp = clientMinutes ? fromMinutes(clientMinutes) : serverTimestamp
    view.map(event(serverTimestamp, a, b, Number.parseFloat(distance) || 10, clientTimestamp))
    result.push(serverTimestamp)
  }
  return result
}
