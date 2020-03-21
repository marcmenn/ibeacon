import { json, jsonCombined } from '../middleware/json.js'

import contact from './contact.js'
import healthState from './health-state.js'
import hello from './hello.js'
import register from './register.js'

const defineActions = (app, context) => {
  app.get('/', json, hello(context))
  app.get('/api', json, hello(context))
  app.post('/api/device/:deviceId', jsonCombined, register(context))
  app.post('/api/device/:deviceId/contact', jsonCombined, contact(context))
  app.post('/api/device/:deviceId/health-state', jsonCombined, healthState(context))
}

export {
  defineActions,
}
