import HttpStatus from 'http-status-codes'
import { collection } from '../../database/couchbase.js'
import event from './event.js'
import { json, jsonOnly } from './json.js'
import withDeviceId from './with-device-id.js'
import wrapAsync from './wrap-async.js'

const beaconIdFromCouchbase = wrapAsync(async (req, res, next) => {
  const { deviceId } = req.params
  let doc
  try {
    const { value } = await collection().get(`device-${deviceId}`)
    doc = value
  } catch (e) {
    res.sendStatus(HttpStatus.FORBIDDEN)
    return
  }
  const { payload } = doc
  const { beaconId } = payload
  req.context.beaconId = beaconId
  next()
})

export default (type) => [withDeviceId, json, jsonOnly, beaconIdFromCouchbase, event(type)]
