import { getTestHost, startTestServer } from './test-server'

const restApiSetup = async () => {
  await startTestServer()

  // eslint-disable-next-line no-console
  console.log(`\n\n --- start test server on ${getTestHost()} ---\n`)
}

export default restApiSetup
