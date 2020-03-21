import { HEALTH_STATUS } from '../../api/health-status.js'

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

// eslint-disable-next-line no-unused-vars
export default () => async (req, res) => {
  // const { deviceId } = req.params
  const filterData = req.query
  const { healthStatus } = filterData

  const contacts = CONTACTS_DUMMY_DATA
    .filter((contact) => (!healthStatus || contact.healthStatus === healthStatus))

  res.send({
    contacts,
  })
}
