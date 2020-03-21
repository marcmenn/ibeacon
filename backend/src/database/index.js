import { timeNow } from '../utility/time-now.js'

import { DB_ITEM_TYPE } from './backend/backend-constants.js'

const { PERSON } = DB_ITEM_TYPE

const nullish = (...args) => {
  for (const x of args) {
    if (x !== undefined && x !== null) return x
  }
  return null
}

class Database {
  constructor(backend) {
    this.backend = backend
  }

  async registerPerson(personData = {}) {
    const {
      beaconId,
      deviceId,
      registerTime,
      infected,
      infectReportTime,
      infectedSinceTime,
    } = personData

    if (!beaconId || !deviceId) {
      throw new Error('missing fields')
    }

    const personDoc = this.backend.getItem(PERSON, beaconId)

    if (personDoc) {
      return this.backend.updateItem(PERSON, beaconId, (doc) => {
        const newInfected = nullish(infected, doc.infected)

        return {
          ...doc,
          deviceId: nullish(deviceId, doc.deviceId),
          registerTime: nullish(doc.registerTime, registerTime, timeNow()),
          infected: newInfected,
          infectReportTime: nullish(
            infectReportTime,
            doc.infectReportTime,
            (newInfected ? timeNow() : undefined),
          ),
          infectedSinceTime: nullish(infectedSinceTime, doc.infectedSinceTime),
        }
      })
    }

    return this.backend.setItem(PERSON, beaconId, {
      beaconId,
      deviceId,
      registerTime: nullish(registerTime, timeNow()),
      infected: nullish(infected, false),
      infectReportTime: nullish(infectReportTime, (infected ? timeNow() : undefined)),
      infectedSinceTime,
      contactsByPerson: {},
    })
  }
}

export {
  Database,
}
