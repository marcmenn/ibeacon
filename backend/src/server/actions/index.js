import { json, jsonCombined } from '../middleware/json'

import contact from './contact'
import hello from './hello'
import registerDevice from './register-device'

const defineActions = (app) => {
  app.get('/', json, hello)
  app.get('/api', json, hello)
  app.post('/api/device', jsonCombined, registerDevice)
  app.post('/api/device/:deviceId', jsonCombined, contact)
}

export {
  defineActions,
}
