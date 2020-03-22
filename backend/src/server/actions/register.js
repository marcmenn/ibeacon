import HttpStatus from 'http-status-codes'
import { EVENT_TYPE } from '../../api/event-type.js'
import { collection } from '../../database/couchbase.js'
import { prepareEvent } from './event.js'
import { json, jsonOnly } from './json.js'
import withBeaconIdFromDatabase from './with-beacon-id-from-database.js'
import withDeviceId from './with-device-id.js'
import wrapAsync from './wrap-async.js'

const checkBeaconId = (req, res, next) => {
  const { beaconId } = req.body

  // no requests without beaconId
  if (!beaconId) {
    res.sendStatus(HttpStatus.BAD_REQUEST)
    return
  }

  // do not re-register
  if (req.context.beaconId === beaconId) {
    res.sendStatus(HttpStatus.OK)
    return
  }

  // no changing of beaconIds
  if (req.context.beaconId) {
    res.sendStatus(HttpStatus.FORBIDDEN)
    return
  }
  req.context.beaconId = beaconId
  next()
}

const register = wrapAsync(async (req, res) => {
  const event = prepareEvent(req, EVENT_TYPE.REGISTER)
  const { deviceId } = req.params
  const id = `device-${deviceId}`
  await collection().insert(id, event)
  res.send(event)
})

export default [
  withDeviceId,
  json,
  jsonOnly,
  withBeaconIdFromDatabase(false),
  checkBeaconId,
  register,
]
