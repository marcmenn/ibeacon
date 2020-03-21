import { json, jsonCombined } from '../middleware/json.js'

import contact from './contact.js'
import healthState from './health-state.js'
import hello from './hello.js'
import register from './register.js'

const middlewareForAsync = (middleware) => async (req, res, next) => {
  try {
    await middleware(req, res, next)
  } catch (e) {
    next(e)
  }
}

const defineActions = (app, context) => {
  app.get('/', json, middlewareForAsync(hello(context)))
  app.get('/api', json, middlewareForAsync(hello(context)))
  app.post('/api/device/:deviceId', jsonCombined, middlewareForAsync(register(context)))
  app.post('/api/device/:deviceId/contact', jsonCombined, middlewareForAsync(contact(context)))
  app.post('/api/device/:deviceId/health-state', jsonCombined, middlewareForAsync(healthState(context)))
}

export {
  defineActions,
}
