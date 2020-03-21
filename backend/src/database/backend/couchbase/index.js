/* eslint-disable class-methods-use-this */
import couchbase from 'couchbase'
import options from './options.js'

const { Cluster } = couchbase

class CouchbaseDatabaseBackend {
  constructor() {
    this.cluster = new Cluster(options.connectString, {
      username: options.username,
      password: options.password,
    })
    this.bucket = this.cluster.bucket(options.bucketName)
    this.collection = this.bucket.defaultCollection()
  }

  async close() {
    await this.cluster.close()
  }

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
    await this.collection.upsert(itemId, doc)
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
