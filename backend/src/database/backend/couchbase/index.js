/* eslint-disable class-methods-use-this */
import couchbase from 'couchbase'
import options from './options.js'

const { Cluster } = couchbase

let cluster = null

export const setBucketName = (bucketName) => {
  if (cluster !== null) {
    throw new Error('Couchbase already connected')
  }
  options.bucketName = bucketName
}

export const connect = () => {
  if (cluster === false) {
    throw new Error('Connection to couchbase already closed')
  }
  if (cluster === null) {
    // eslint-disable-next-line no-console
    console.log('Connecting to couchbase')
    cluster = new Cluster(options.connectString, {
      username: options.username,
      password: options.password,
    })
  }
  return cluster
}

export const bucket = (bucketName = options.bucketName) => connect().bucket(bucketName)
export const collection = () => bucket().defaultCollection()

export const close = async () => {
  if (cluster) {
    // eslint-disable-next-line no-console
    console.log('Closing couchbase connection')
    await cluster.close()
    cluster = false
  }
}

class CouchbaseDatabaseBackend {
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
    await collection().upsert(itemId, doc)
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
