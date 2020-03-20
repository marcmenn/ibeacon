import express from 'express'

import contact from './actions/contact'
import registerDevice from './actions/register-device'

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

app.get('/', (req, res) => {
  res.send('ibeacon')
})
app.post('/device', jsononly, json, registerDevice)
app.post('/device/:deviceId', jsononly, json, contact)

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
