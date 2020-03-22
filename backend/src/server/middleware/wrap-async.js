export default (middleware) => async (req, res, next) => {
  try {
    await middleware(req, res, next)
  } catch (e) {
    next(e)
  }
}
