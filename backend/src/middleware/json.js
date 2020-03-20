import express from 'express'
import connect from 'connect'

const json = express.json()

const jsonOnly = (req, res, next) => {
  if (req.is('json')) {
    next()
  } else {
    res.sendStatus(406)
  }
}

const jsonCombined = connect([json, jsonOnly])

export {
  json,
  jsonCombined,
  jsonOnly,
}
