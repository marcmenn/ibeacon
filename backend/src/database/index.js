import uuid from 'uuid'

import { collection } from './backend/couchbase/index.js'

const { v4 } = uuid

export default async (event) => {
  const id = v4()
  await collection().insert(id, event)
  return { id, event }
}
