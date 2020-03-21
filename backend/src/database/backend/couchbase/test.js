/* eslint-disable class-methods-use-this */
import couchbase from 'couchbase'
import options from './options.js'

const { Cluster } = couchbase

let cluster = null

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

export const close = async () => {
  if (cluster) {
    // eslint-disable-next-line no-console
    console.log('Closing couchbase connection')
    await cluster.close()
    cluster = false
  }
}

const test = async () => {
  const _cluster = connect()
  await _cluster._connect()
  console.log(await _cluster.diagnostics())
}

test().catch((e) => {
  console.error(e)
}).finally(close)
