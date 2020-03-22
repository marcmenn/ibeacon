import chai from 'chai'
import { EVENT_TYPE } from '../../../src/api/event-type.js'
import { HEALTH_STATUS } from '../../../src/api/health-status.js'
import { collection } from '../../../src/database/couchbase.js'
import { getContactsByBeacon } from '../../../src/database/get-contacts.js'
import { queryContactByBeacon, queryHealthStateByBeacon } from '../../../src/database/views.js'
import { createId } from '../../../src/utility/create-id.js'
import { timeNow } from '../../../src/utility/time-now.js'
import { collectId, deleteCollectedIds, ensureView } from '../../test-api/database.js'

const { expect } = chai

const saveEvent = async (type, deviceId, payload) => {
  const id = createId()
  const event = { type, deviceId, timestamp: timeNow(), payload }
  await collection().insert(id, event)
  return { id, ...event }
}

describe('get contacts', function test() {
  this.timeout(60000)

  after(deleteCollectedIds)

  it('should find all contacts', async () => {
    collectId(await saveEvent(EVENT_TYPE.REGISTER, 'deviceIdA', { beaconId: 'beaconIdA.1' }))
    collectId(await saveEvent(EVENT_TYPE.REGISTER, 'deviceIdB', { beaconId: 'beaconIdB.1' }))
    collectId(await saveEvent(EVENT_TYPE.REGISTER, 'deviceIdC', { beaconId: 'beaconIdC.1' }))

    collectId(await saveEvent(EVENT_TYPE.HEALTH_STATE, 'deviceIdA', { healthState: HEALTH_STATUS.HEALTHY }))
    collectId(await saveEvent(EVENT_TYPE.HEALTH_STATE, 'deviceIdB', { healthState: HEALTH_STATUS.SICK }))
    collectId(await saveEvent(EVENT_TYPE.HEALTH_STATE, 'deviceIdC', { healthState: HEALTH_STATUS.SICK }))

    collectId(await saveEvent(EVENT_TYPE.CONTACT, 'deviceIdA', { beaconId: 'beaconIdA.1', contactedBeaconId: 'beaconIdB.1', distance: 4.4 }))
    collectId(await saveEvent(EVENT_TYPE.CONTACT, 'deviceIdB', { beaconId: 'beaconIdB.1', contactedBeaconId: 'beaconIdA.1', distance: 4.7 }))
    collectId(await saveEvent(EVENT_TYPE.CONTACT, 'deviceIdA', { beaconId: 'beaconIdA.1', contactedBeaconId: 'beaconIdC.1', distance: 3.2 }))

    await ensureView(queryContactByBeacon)
    await ensureView(queryHealthStateByBeacon)

    const contacts = await getContactsByBeacon('beaconIdA.1')

    expect(contacts.length).to.equal(2)
  })
})