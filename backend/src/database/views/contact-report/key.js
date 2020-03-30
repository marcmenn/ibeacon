export default (beaconId, date) => [
  beaconId,
  date.getUTCFullYear(),
  date.getUTCMonth(),
  date.getUTCDate(),
]
