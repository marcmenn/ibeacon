class CouchbaseDatabaseBackend {
  constructor(config) {
    this.config = config
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteAll() {
    // to implement
  }

  async deleteAllOfItemType(dbItemType) {
    // to implement
    // eslint-disable-next-line no-console
    console.log('to implement', dbItemType)
  }

  async deleteItem(dbItemType, itemId) {
    // to implement
    // eslint-disable-next-line no-console
    console.log('to implement', dbItemType, itemId)
  }

  async getAllItems(dbItemType) {
    // to implement
    // eslint-disable-next-line no-console
    console.log('to implement', dbItemType)
    return []
  }

  async getItem(dbItemType, itemId) {
    // to implement
    // eslint-disable-next-line no-console
    console.log('to implement', dbItemType, itemId)
    return undefined
  }

  async setItem(dbItemType, itemId, doc) {
    // to implement
    // eslint-disable-next-line no-console
    console.log('to implement', dbItemType, itemId, doc)
    return doc
  }

  async updateItem(dbItemType, itemId, docUpdateFn) {
    // to implement
    // eslint-disable-next-line no-console
    console.log('to implement', dbItemType, itemId, docUpdateFn)
    return {}
  }
}

export {
  CouchbaseDatabaseBackend,
}
