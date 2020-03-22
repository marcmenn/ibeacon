import HttpStatus from 'http-status-codes'
import { EVENT_TYPE } from '../../api/event-type.js'
import event from './event.js'
import { json, jsonOnly } from './json.js'
import withBeaconIdFromDatabase from './with-beacon-id-from-database.js'
import withDeviceId from './with-device-id.js'

const checkBeaconId = (req, res, next) => {
  const { beaconId } = req.body

  // no requests without beaconId
  if (!beaconId) {
    res.sendStatus(HttpStatus.BAD_REQUEST)
    return
  }

  // do not re-register
  if (req.context.beaconId === beaconId) {
    req.sendStatus(HttpStatus.OK)
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

const reqId = (req, res, next) => {
  const { deviceId } = req.params
  req.id = `device-${deviceId}`
  next()
}

export default [
  withDeviceId,
  json,
  jsonOnly,
  withBeaconIdFromDatabase(false),
  checkBeaconId,
  reqId,
  event(EVENT_TYPE.REGISTER),
]
