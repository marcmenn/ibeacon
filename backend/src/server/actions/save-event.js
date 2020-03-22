import event from './event.js'
import { json, jsonOnly } from './json.js'
import withDeviceId from './with-device-id.js'

export default (type) => [withDeviceId, json, jsonOnly, event(type)]
