import { collection } from '../../src/database/couchbase.js'

let ids = []

export const collectId = (result = {}) => {
  const { id } = result

  if (!ids.includes(id)) {
    ids.push(id)
  }
}

export const deleteCollectedIds = async (idsToDelete = ids) => {
  const col = collection()

  await Promise.all(idsToDelete.map(async (id) => col.remove(id)))

  if (idsToDelete === ids) {
    ids = []
  }
}

export const ensureView = async (viewQueryFn, options = {}) => {
  const {
    maxTry = 10,
    delay = 100,
  } = options

  for (let idx = 0; idx < maxTry; idx += 1) {
    // eslint-disable-next-line no-await-in-loop
    const { meta, rows } = await viewQueryFn({ stale: false, limit: 0 })

    if (rows.length > 0 || meta.total_rows > 0) {
      return true
    }

    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  return false
}
