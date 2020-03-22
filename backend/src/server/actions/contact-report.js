import orderBy from 'lodash/orderBy.js'

import { getContactsByBeacon } from '../../database/get-contacts.js'
import { HEALTH_STATUS } from '../../api/health-status.js'
import { json } from './json.js'
import withBeaconIdFromDatabase from './with-beacon-id-from-database.js'
import withDeviceId from './with-device-id.js'
import wrapAsync from './wrap-async.js'

const { HEALTHY, SICK } = HEALTH_STATUS

const CONTACTS_DUMMY_DATA = [
  { timestamp: '2020-03-21T11:48:01.510Z', healthStatus: HEALTHY, distance: 1.1, duration: 23 },
  { timestamp: '2020-03-21T10:48:01.510Z', healthStatus: SICK, distance: 0.3, duration: 54 },
  { timestamp: '2020-03-21T09:48:01.510Z', healthStatus: HEALTHY, distance: 0.6, duration: 32 },
  { timestamp: '2020-03-21T05:48:01.510Z', healthStatus: SICK, distance: 1.4, duration: 5 },
  { timestamp: '2020-03-20T18:48:01.510Z', healthStatus: SICK, distance: 4.3, duration: 10 },
  { timestamp: '2020-03-20T10:48:01.510Z', healthStatus: HEALTHY, distance: 11.4, duration: 13 },
  { timestamp: '2020-03-20T07:48:01.510Z', healthStatus: SICK, distance: 2.3, duration: 64 },
  { timestamp: '2020-03-19T23:48:01.510Z', healthStatus: HEALTHY, distance: 8.2, duration: 43 },
  { timestamp: '2020-03-19T16:48:01.510Z', healthStatus: HEALTHY, distance: 3.7, duration: 12 },
  { timestamp: '2020-03-18T08:48:01.510Z', healthStatus: SICK, distance: 9.1, duration: 76 },
]

const contactReport = wrapAsync(async (req, res) => {
  const { beaconId } = req.context
  const {
    healthStatus,
    showRealData = false, // TODO: remove feature flag
  } = req.query

  let contacts = []

  if (showRealData) {
    const detailedContacts = beaconId ? await getContactsByBeacon(beaconId) : []

    contacts = detailedContacts.map(({ healthInfo, contactInfo }) => {
      const { distanceCount, distanceSum, minDistance, maxDistance } = contactInfo
      const distanceAverage = distanceCount > 0 ? distanceSum / distanceCount : minDistance

      return {
        timestamp: contactInfo.maxTimestamp,
        healthStatus: healthInfo.lastHealthState,
        distance: distanceAverage,
        minDistance,
        maxDistance,
        firstContact: contactInfo.minTimestamp,
        healthTimestamp: healthInfo.lastTimestamp,
      }
    })
  } else {
    contacts = CONTACTS_DUMMY_DATA
  }

  contacts = contacts.filter((contact) => (!healthStatus || contact.healthStatus === healthStatus))
  contacts = orderBy(contacts, 'timestamp', 'desc')

  res.send({
    contacts,
  })
})

export default [
  withDeviceId,
  json,
  withBeaconIdFromDatabase(true),
  contactReport,
]
