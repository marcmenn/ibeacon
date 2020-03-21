import { json, jsonCombined } from '../middleware/json.js'

import contact from './contact.js'
import hello from './hello.js'
import registerDevice from './register-device.js'

const defineActions = (app) => {
  app.get('/', json, hello)
  app.get('/api', json, hello)
  app.post('/api/device', jsonCombined, registerDevice)
  app.post('/api/device/:deviceId', jsonCombined, contact)
}

export {
  defineActions,
}
