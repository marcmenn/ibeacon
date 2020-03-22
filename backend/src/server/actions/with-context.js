export default (req, res, next) => {
  if (!req.context) req.context = {}
  next()
}
