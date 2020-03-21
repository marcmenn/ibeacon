import saveEvent from '../../database/event.js'

export default (type) => async (req, res) => {
  const { deviceId } = req.params

  const { timestamp, payload } = await saveEvent(type, deviceId, req.body)

  res.send({
    type,
    deviceId,
    timestamp,
    payload,
  })
}
