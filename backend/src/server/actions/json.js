import express from 'express'

const json = express.json()

const jsonOnly = (req, res, next) => {
  if (req.is('json')) {
    next()
  } else {
    res.sendStatus(406)
  }
}

export {
  json,
  jsonOnly,
}
