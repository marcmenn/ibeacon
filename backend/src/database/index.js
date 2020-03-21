import uuid from 'uuid'

import { DB_ITEM_TYPE } from './backend/backend-constants.js'

const { EVENT } = DB_ITEM_TYPE
const { v4 } = uuid

class Database {
  constructor(backend) {
    this.backend = backend
  }

  async saveEvent(eventData) {
    const id = v4()
    return this.backend.setItem(EVENT, id, eventData)
  }
}

export {
  Database,
}
