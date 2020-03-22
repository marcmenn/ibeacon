import compact from 'lodash/compact.js'

import { getHealthStateByBeacon } from './get-health-state.js'
import { queryContactByBeacon } from './views.js'

export const getContactsByBeacon = async (fromBeaconId) => {
  const contactResult = await queryContactByBeacon({ key: fromBeaconId })
  const info = contactResult.rows[0] || {}
  const { infoByBeaconId = {} } = info

  return compact(
    await Promise.all(
      Object.keys(infoByBeaconId).map(async (beaconId) => {
        const contactInfo = infoByBeaconId[beaconId]
        const healthInfo = await getHealthStateByBeacon(beaconId)

        return {
          beaconId,
          healthInfo,
          contactInfo,
        }
      }),
    ),
  )
}
