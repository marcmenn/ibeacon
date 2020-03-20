import express from 'express'
import registerDevice from './actions/register-device.js'
import contact from './actions/contact.js'

const app = express()
const port = 3000

const jsononly = (req, res, next) => {
  if (req.is('json')) {
    next()
  } else {
    res.sendStatus(406)
  }
}

const json = express.json()

app.post('/device', jsononly, json, registerDevice)
app.post('/device/:deviceId', jsononly, json, contact)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
