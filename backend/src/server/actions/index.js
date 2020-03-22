import addRequestId from 'express-request-id'
import { EVENT_TYPE } from '../../api/event-type.js'
import { json, jsonOnly } from './json.js'
import withDeviceId from './with-device-id.js'
import withContext from './with-context.js'
import contactReport from './contact-report.js'

import event from './event.js'
import hello from './hello.js'

const defineActions = (app) => {
  app.use(addRequestId())
  app.use(withContext)
  app.get('/', json, hello)
  app.get('/api', json, hello)
  app.post('/api/device/:deviceId', withDeviceId, json, jsonOnly, event(EVENT_TYPE.REGISTER))
  app.get('/api/device/:deviceId/contact', withDeviceId, json, contactReport)
  app.post('/api/device/:deviceId/contact', withDeviceId, json, jsonOnly, event(EVENT_TYPE.CONTACT))
  app.post('/api/device/:deviceId/health-state', withDeviceId, json, jsonOnly, event(EVENT_TYPE.HEALTH_STATE))
}

export {
  defineActions,
}
