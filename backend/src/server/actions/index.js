import { EVENT_TYPE } from '../../api/event-type.js'
import { json, jsonOnly } from '../middleware/json.js'
import withDeviceId from '../middleware/with-device-id.js'
import contactReport from './contact-report.js'

import event from './event.js'
import hello from './hello.js'

const middlewareForAsync = (middleware) => async (req, res, next) => {
  try {
    await middleware(req, res, next)
  } catch (e) {
    next(e)
  }
}

const defineActions = (app) => {
  app.get('/', json, middlewareForAsync(hello))
  app.get('/api', json, middlewareForAsync(hello))
  app.post('/api/device/:deviceId', withDeviceId, json, jsonOnly, middlewareForAsync(event(EVENT_TYPE.REGISTER)))
  app.get('/api/device/:deviceId/contact', withDeviceId, json, middlewareForAsync(contactReport))
  app.post('/api/device/:deviceId/contact', withDeviceId, json, jsonOnly, middlewareForAsync(event(EVENT_TYPE.CONTACT)))
  app.post('/api/device/:deviceId/health-state', withDeviceId, json, jsonOnly, middlewareForAsync(event(EVENT_TYPE.HEALTH_STATE)))
}

export {
  defineActions,
}
