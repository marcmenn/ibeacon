import { json, jsonOnly } from '../middleware/json.js'

import contact from './contact.js'
import contactReport from './contact-report.js'
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
  app.post('/api/device/:deviceId', json, jsonOnly, middlewareForAsync(register(context)))
  app.get('/api/device/:deviceId/contact', json, middlewareForAsync(contactReport(context)))
  app.post('/api/device/:deviceId/contact', json, jsonOnly, middlewareForAsync(contact(context)))
  app.post('/api/device/:deviceId/health-state', json, jsonOnly, middlewareForAsync(healthState(context)))
}

export {
  defineActions,
}
