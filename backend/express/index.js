import express from 'express'
const app = express()
const port = 3000

app.post('/device', express.json(), (req, res) => {
  if (!req.is('json')) {
    res.sendStatus(406)
    return
  }
  res.send(`registered ${req.body.deviceId}/${req.body.beaconId}`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
