import chai from 'chai'
import { HEALTH_STATUS } from '../../../src/api/health-status.js'

import map from '../../../src/database/views/health-report/map.js'
import reduce from '../../../src/database/views/health-report/reduce.js'
import View from './views.js'

const { expect } = chai

describe('view.health-report', () => {
  const beaconId = 'beaconId'
  const clientTimestamp = '2121-12-12T12:12:12.000Z'
  const ms = new Date(clientTimestamp).getTime()
  const healthState = HEALTH_STATUS.HEALTHY
  const beaconKey = [beaconId, 2121, 11]
  const view = new View(map, reduce)

  describe('map', () => {
    afterEach(() => view.clear())

    describe('happy path', () => {
      const type = 'health-state'
      const serverTimestamp = '2020-02-02T02:02:02.000Z'
      const payload = { beaconId, timestamp: clientTimestamp, healthState }
      const doc = { type, payload, timestamp: serverTimestamp }

      it('should emit one event', () => {
        view.map(doc)
        expect(view.emitted).to.have.lengthOf(1)
      })

      it('should emit key beaconId,yyyy,mm', () => {
        view.map(doc)
        expect(view.emitted.map(({ key }) => key)).to.be.an('array').that.deep.includes(beaconKey)
      })

      it('should emit value for beaconId', () => {
        view.map(doc)
        expect(view.get(beaconKey)).to.be.an('object').that.deep.equals({
          ms,
          healthState,
        })
      })
    })
  })

  describe('reduce', () => {
    it('should convert a mapped to a reduced document', () => {
      const doc = { ms, beaconId, healthState }
      const result = reduce(beaconKey, [doc], false)
      expect(result).to.be.an('object').that.deep.equals({
        [beaconId]: [
          {
            ms,
            healthState,
          },
        ],
      })
    })

    it('should merge two close docs into an interval', () => {
      const doc1 = { ms, healthState }
      const doc2 = { ms: ms + 60000, healthState }
      const result = reduce(beaconKey, [doc1, doc2], false)
      expect(result).to.be.an('object').that.deep.equals({
        [beaconId]: [doc1, doc2],
      })
    })
  })
})
