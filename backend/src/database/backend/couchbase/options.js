const { CB_USERNAME, CB_PASSWORD, CB_BUCKETNAME, CB_CONNECT_STRING } = process.env

export default {
  connectString: CB_CONNECT_STRING || 'couchbase://127.0.0.1?config_total_timeout=60',
  bucketName: CB_BUCKETNAME || 'default',
  username: CB_USERNAME || 'username',
  password: CB_PASSWORD || 'password',
}
