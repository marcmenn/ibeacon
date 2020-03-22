import { HEALTH_STATUS } from '../../api/health-status.js'
import { bucket } from '../../database/couchbase.js'
import withBeaconIdFromDatabase from './with-beacon-id-from-database.js'
import withDeviceId from './with-device-id.js'
import wrapAsync from './wrap-async.js'

// how long are we infectious before we know healthState of sick
const INCUBATION_TIME = 14 * 24 * 60 * 60 * 1000

// how far in the past are we looking for sick states
const LOOKBACK_TIME = 14 * 24 * 60 * 60 * 1000

// if we're healthy that fast, we aren't really sick
const ACCIDENTAL_SICK = 60 * 60 * 1000

const { HEALTHY, SICK } = HEALTH_STATUS

const getContactReport = async (beaconId) => {
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - INCUBATION_TIME)
  const end = [
    beaconId,
    endDate.getUTCFullYear(),
    endDate.getUTCMonth(),
    endDate.getUTCDate(),
  ]
  const start = [
    beaconId,
    startDate.getUTCFullYear(),
    startDate.getUTCMonth(),
    startDate.getUTCDate(),
  ]

  const { rows } = await bucket().viewQuery('views', 'contactReport', {
    stale: 'false',
    reduce: true,
    group: true,
    range: {
      start,
      end,
      inclusive_end: true,
    },
  })

  if (!rows.length) return {}
  const [contactReport] = rows
  return contactReport
}

const getHealthReportKeys = (contactReport) => {
  const keys = []
  const serialMonth = (date) => date.getUTCFullYear() * 100 + date.getUTCMonth()
  for (const contact of Object.keys(contactReport)) {
    const intervals = contactReport[contact]
    const first = new Date(intervals[0].start - LOOKBACK_TIME)
    first.setDate(1)
    const last = new Date(intervals[intervals.length - 1].end + INCUBATION_TIME)
    last.setDate(1)
    while (serialMonth(first) <= serialMonth(last)) {
      keys.push([contact, first.getUTCFullYear(), first.getUTCMonth()])
      first.setUTCMonth(first.getUTCMonth() + 1)
    }
  }
  return keys
}

const reduceAccidental = (accumulator, currentValue) => {
  const { ms, healthState } = currentValue
  while (
    healthState === HEALTHY &&
    accumulator.length &&
    accumulator[accumulator.length - 1].healthState === SICK &&
    accumulator[accumulator.length - 1].ms > ms + ACCIDENTAL_SICK) {
    accumulator.pop()
  }
  accumulator.push(currentValue)
  return accumulator
}

const reduceInfectious = ({ start, infectiousIntervals }, { ms, healthState }) => {
  if (healthState === SICK) {
    return { start: start || ms - INCUBATION_TIME, infectiousIntervals }
  }
  if (start) {
    if (infectiousIntervals.length) {
      const last = infectiousIntervals[infectiousIntervals.length - 1]
      if (last.end > start) {
        last.end = ms
        return { infectiousIntervals }
      }
    }
    infectiousIntervals.push({ start, end: ms })
  }
  return { infectiousIntervals }
}

const getHealthReport = async (contactReport) => {
  const keys = getHealthReportKeys(contactReport)
  const { rows } = await bucket().viewQuery('views', 'healthReport', {
    stale: 'false',
    reduce: true,
    group: true,
    keys,
  })
  if (!rows.length) return []
  const [healthReport] = rows
  const result = []
  for (const contact of Object.keys(contactReport)) {
    const healthStates = healthReport[contact]
    if (healthStates) {
      healthStates.push({ ms: Date.now(), healtState: HEALTHY })
      const { infectiousIntervals } = healthStates
        .reduce(reduceAccidental, [])
        .reduce(reduceInfectious, { infectiousIntervals: [] })
      let infectiousIndex = 0
      const filterInterval = (start, end) => {
        while (infectiousIndex < infectiousIntervals.length) {
          const { start: s, end: e } = infectiousIntervals[infectiousIndex]
          if (e > start) {
            return s < end
          }
          infectiousIndex += 1
        }
        return false
      }
      contactReport[contact].forEach(({ n, sumDistance, start, end }) => {
        const infectious = filterInterval(start, end)
        const distance = sumDistance / n
        const timestamp = new Date(start).toISOString()
        const duration = (end - start) / 60000
        result.push({ timestamp, duration, infectious, distance })
      })
    }
  }
  result.sort(({ timestamp: a }, { timestamp: b }) => a.compareTo(b))
  return result
}

const contactReport = wrapAsync(async (req, res) => {
  const { beaconId } = req.context
  const report = await getContactReport(beaconId)
  const healthReport = await getHealthReport(report)
  res.send(healthReport)
})

export default [
  withDeviceId,
  withBeaconIdFromDatabase(true),
  contactReport,
]
