import { queryHealthStateByBeacon } from './views.js'

export const getHealthStateByBeacon = async (beaconId) => {
  const result = await queryHealthStateByBeacon({ key: beaconId })

  return result.rows[0]
}
