import chai from 'chai'
import { EVENT_TYPE } from '../../../src/api/event-type.js'
import { HEALTH_STATUS } from '../../../src/api/health-status.js'
import { collection } from '../../../src/database/couchbase.js'
import { getContactsByBeacon } from '../../../src/database/get-contacts.js'
import { queryContactByBeacon, queryHealthStateByBeacon } from '../../../src/database/views.js'
import { createId } from '../../../src/utility/create-id.js'
import { timeNow } from '../../../src/utility/time-now.js'
import { ensureView } from '../../test-api/database.js'
import { register } from '../actions/register.rest-api.js'

const { expect } = chai

const saveEvent = async (type, deviceId, beaconId, payload) => {
  const id = createId()
  const event = { type, deviceId, beaconId, timestamp: timeNow(), payload }
  await collection().insert(id, event)
  return id
}

describe('get contacts', function test() {
  this.timeout(60000)
  const idsToDelete = []

  after(async () => {
    const col = collection()
    await Promise.all(idsToDelete.map(async (id) => col.remove(id)))
  })

  it('should find all contacts', async () => {
    await Promise.all([
      register('deviceIdA', 'beaconIdA.1', '2020-03-21T09:48:01.510Z'),
      register('deviceIdB', 'beaconIdB.1', '2020-03-21T09:48:01.510Z'),
      register('deviceIdC', 'beaconIdC.1', '2020-03-21T09:48:01.510Z'),
    ])
    idsToDelete.push('device-deviceIdA', 'device-deviceIdB', 'device-deviceIdC')

    const values = await Promise.all([
      saveEvent(EVENT_TYPE.HEALTH_STATE, 'deviceIdA', 'beaconIdA.1', { healthState: HEALTH_STATUS.HEALTHY }),
      saveEvent(EVENT_TYPE.HEALTH_STATE, 'deviceIdB', 'beaconIdB.1', { healthState: HEALTH_STATUS.SICK }),
      saveEvent(EVENT_TYPE.HEALTH_STATE, 'deviceIdC', 'beaconIdC.1', { healthState: HEALTH_STATUS.SICK }),
      saveEvent(EVENT_TYPE.CONTACT, 'deviceIdA', 'beaconIdA.1', { beaconId: 'beaconIdA.1', contactedBeaconId: 'beaconIdB.1', distance: 4.4 }),
      saveEvent(EVENT_TYPE.CONTACT, 'deviceIdB', 'beaconIdB.1', { beaconId: 'beaconIdB.1', contactedBeaconId: 'beaconIdA.1', distance: 4.7 }),
      saveEvent(EVENT_TYPE.CONTACT, 'deviceIdA', 'beaconIdA.1', { beaconId: 'beaconIdA.1', contactedBeaconId: 'beaconIdC.1', distance: 3.2 }),
    ])

    idsToDelete.push(...values)

    await ensureView(queryContactByBeacon)
    await ensureView(queryHealthStateByBeacon)

    const contacts = await getContactsByBeacon('beaconIdA.1')

    expect(contacts.length).to.equal(2)
  })
})
