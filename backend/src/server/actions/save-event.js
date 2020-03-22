import HttpStatus from 'http-status-codes'
import event from './event.js'
import { json, jsonOnly } from './json.js'
import withBeaconIdFromDatabase from './with-beacon-id-from-database.js'
import withDeviceId from './with-device-id.js'

const requireBeaconId = (req, res, next) => {
  if (!req.context.beaconId) {
    res.sendStatus(HttpStatus.FORBIDDEN)
  } else {
    next()
  }
}

export default (type) => [
  withDeviceId,
  json,
  jsonOnly,
  withBeaconIdFromDatabase,
  requireBeaconId,
  event(type),
]
