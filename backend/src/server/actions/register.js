import { EVENT_TYPE } from '../../api/event-type.js'
import event from './event.js'
import { json, jsonOnly } from './json.js'
import withDeviceId from './with-device-id.js'

const withBeaconIdFromPayload = (req, res, next) => {
  const { beaconId } = req.body
  if (!beaconId) {
    res.sendStatus(400)
  } else {
    req.context.beaconId = beaconId
  }
  next()
}

export default [withDeviceId, json, jsonOnly, withBeaconIdFromPayload, event(EVENT_TYPE.REGISTER)]
