const { CB_USERNAME, CB_PASSWORD, CB_BUCKETNAME, CB_CONNECT_STRING } = process.env

export default {
  connectString: CB_CONNECT_STRING || 'couchbase://localhost',
  bucketName: CB_BUCKETNAME || 'default',
  username: CB_USERNAME || 'username',
  password: CB_PASSWORD || 'password',
}
