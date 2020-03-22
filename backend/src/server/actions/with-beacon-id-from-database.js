import couchbase from 'couchbase'
import HttpStatus from 'http-status-codes'
import { collection } from '../../database/couchbase.js'
import wrapAsync from './wrap-async.js'

const { DocumentNotFoundError } = couchbase

export default (required) => wrapAsync(async (req, res, next) => {
  const { deviceId } = req.params
  try {
    const { value } = await collection().get(`device-${deviceId}`)
    const { payload } = value
    const { beaconId } = payload
    req.context.beaconId = beaconId
  } catch (e) {
    if (!(e instanceof DocumentNotFoundError)) {
      next(e)
      return
    }
    if (required) {
      res.sendStatus(HttpStatus.FORBIDDEN)
      return
    }
  }
  next()
})
