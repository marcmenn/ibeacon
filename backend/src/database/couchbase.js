import couchbase from 'couchbase'

const { CB_USERNAME, CB_PASSWORD, CB_BUCKETNAME, CB_CONNECT_STRING } = process.env

const options = {
  connectString: CB_CONNECT_STRING || 'couchbase://127.0.0.1?config_total_timeout=60',
  bucketName: CB_BUCKETNAME || 'default',
  username: CB_USERNAME || 'username',
  password: CB_PASSWORD || 'password',
}

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
