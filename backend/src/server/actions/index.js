import addRequestId from 'express-request-id'
import { EVENT_TYPE } from '../../api/event-type.js'
import contactReport from './contact-report.js'
import hello from './hello.js'
import register from './register.js'
import saveEvent from './save-event.js'
import withContext from './with-context.js'

const defineActions = (app) => {
  app.use(addRequestId())
  app.use(withContext)
  app.get('/', hello)
  app.get('/api', hello)
  app.post('/api/device/:deviceId', register)
  app.get('/api/device/:deviceId/contact', contactReport)
  app.post('/api/device/:deviceId/contact', saveEvent(EVENT_TYPE.CONTACT))
  app.post('/api/device/:deviceId/health-state', saveEvent(EVENT_TYPE.HEALTH_STATE))
}

export {
  defineActions,
}
