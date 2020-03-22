import event from './event.js'
import { json, jsonOnly } from './json.js'
import withBeaconIdFromDatabase from './with-beacon-id-from-database.js'
import withDeviceId from './with-device-id.js'

export default (type) => [
  withDeviceId,
  json,
  jsonOnly,
  withBeaconIdFromDatabase(true),
  event(type),
]
