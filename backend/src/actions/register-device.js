export default (req, res) => {
  const { deviceId, beaconId } = req.body
  res.send(`registered ${deviceId}/${beaconId}`)
}
