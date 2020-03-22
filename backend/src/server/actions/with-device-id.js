import HttpStatus from 'http-status-codes'

export default (req, res, next) => {
  const { deviceId } = req.params
  if (deviceId) {
    next()
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND) // no device-id implies illegal path
  }
}
