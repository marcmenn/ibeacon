import { bucket } from './couchbase.js'

export const VIEWS_DESIGN_DOC = 'views'

export const CB_VIEW = {
  CONTACT_REPORT: 'contactReport',
  CONTACT_BY_BEACON: 'contactByBeacon',
  HEALTH_STATE_BY_BEACON: 'healthStateByBeacon',
}

export const queryView = async (viewName, options) => (
  bucket().viewQuery(VIEWS_DESIGN_DOC, viewName, options)
)
const createQueryFn = (viewName) => (options) => queryView(viewName, options)

export const queryContactReport = createQueryFn(CB_VIEW.CONTACT_REPORT)
export const queryContactByBeacon = createQueryFn(CB_VIEW.CONTACT_BY_BEACON)
export const queryHealthStateByBeacon = createQueryFn(CB_VIEW.HEALTH_STATE_BY_BEACON)
