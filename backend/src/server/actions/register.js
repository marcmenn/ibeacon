import { EVENT_TYPE } from '../../api/event-type.js'
import saveEvent from '../../database/event.js'

export default () => async (req, res) => {
  const registrationData = req.body
  const { deviceId } = req.params

  const { timestamp, payload } = await saveEvent(EVENT_TYPE.REGISTER, deviceId, registrationData)

  res.send({
    message: 'registered',
    deviceId,
    timestamp,
    payload,
  })
}
