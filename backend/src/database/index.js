import { v4 as uuid } from 'uuid'

import { DB_ITEM_TYPE } from './backend/backend-constants.js'

const { EVENT } = DB_ITEM_TYPE

class Database {
  constructor(backend) {
    this.backend = backend
  }

  async saveEvent(eventData) {
    const id = uuid()
    return this.backend.setItem(EVENT, id, eventData)
  }
}

export {
  Database,
}
