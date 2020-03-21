import Immutable from 'immutable'

class MockDatabaseBackend {
  constructor() {
    this.itemMapByType = new Immutable.Map()
  }

  async deleteAll() {
    this.itemMapByType = new Immutable.Map()
  }

  async deleteAllOfItemType(dbItemType) {
    this.itemMapByType = this.itemMapByType.delete(dbItemType)
  }

  async deleteItem(dbItemType, itemId) {
    this.itemMapByType = this.itemMapByType.deleteIn([dbItemType, itemId])
  }

  async getAllItems(dbItemType) {
    const itemMap = this.itemMapByType.get(dbItemType)
    return itemMap
      ? [...itemMap.values()]
      : []
  }

  async getItem(dbItemType, itemId) {
    return this.itemMapByType.getIn([dbItemType, itemId])
  }

  async setItem(dbItemType, itemId, doc) {
    this.itemMapByType = this.itemMapByType.setIn([dbItemType, itemId], doc)
    return doc
  }

  async updateItem(dbItemType, itemId, docUpdateFn) {
    this.itemMapByType = this.itemMapByType.updateIn([dbItemType, itemId], docUpdateFn)
    return this.getItem(dbItemType, itemId)
  }
}

export {
  MockDatabaseBackend,
}
