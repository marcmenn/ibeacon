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
