import { getTestHost, stopTestServer } from './test-server'

const restApiTearDown = async () => {
  // eslint-disable-next-line no-console
  console.log(`\n --- stop test server on ${getTestHost()} ---\n`)

  await stopTestServer()
}

export default restApiTearDown
