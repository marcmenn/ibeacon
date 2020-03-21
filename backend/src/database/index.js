import { timeNow } from '../utility/time-now'

import { DB_ITEM_TYPE } from './backend/backend-constants'

const { PERSON } = DB_ITEM_TYPE

class Database {
  backend = undefined

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
        const newInfected = infected ?? doc.infected

        return {
          ...doc,
          deviceId: deviceId ?? doc.deviceId,
          registerTime: doc.registerTime ?? registerTime ?? timeNow(),
          infected: newInfected,
          infectReportTime: (
            infectReportTime ??
            doc.infectReportTime ??
            (newInfected ? timeNow() : undefined)
          ),
          infectedSinceTime: infectedSinceTime ?? doc.infectedSinceTime,
        }
      })
    }

    return this.backend.setItem(PERSON, beaconId, {
      beaconId,
      deviceId,
      registerTime: registerTime ?? timeNow(),
      infected: infected ?? false,
      infectReportTime: infectReportTime ?? (infected ? timeNow() : undefined),
      infectedSinceTime,
      contactsByPerson: {},
    })
  }
}

export {
  Database,
}
