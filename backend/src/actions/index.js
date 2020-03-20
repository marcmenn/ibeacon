import { jsonCombined } from '../middleware/json'

import contact from './contact'
import hello from './hello'
import registerDevice from './register-device'

const defineActions = (app) => {
  app.get('/', hello)
  app.post('/device', jsonCombined, registerDevice)
  app.post('/device/:deviceId', jsonCombined, contact)
}

export {
  defineActions,
}
