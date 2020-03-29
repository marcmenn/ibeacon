import chai from 'chai'

import map from '../../../src/database/views/contact-report/map.js'
import reduce from '../../../src/database/views/contact-report/reduce.js'

const { expect } = chai

describe('view.contact-report', () => {
  const beaconId = 'beaconId'
  const clientTimestamp = '2121-12-12T12:12:12.000Z'
  const ms = new Date(clientTimestamp).getTime()
  const distance = 5

  describe('map', () => {
    const emitted = []
    let byKey = {}

    const strKey = (key) => key.join('-')

    const emittedValueByKey = (key) => byKey[strKey(key)]

    beforeEach(() => {
      global.emit = (key, value) => {
        emitted.push({ key, value })
        byKey[strKey(key)] = value
      }
      emitted.length = 0
      byKey = {}
    })

    afterEach(() => {
      delete global.emit
    })

    describe('happy path', () => {
      const type = 'contact'
      const serverTimestamp = '2020-02-02T02:02:02.000Z'
      const contactedBeaconId = 'contactedBeaconId'
      const payload = { beaconId, contactedBeaconId, timestamp: clientTimestamp, distance }
      const doc = { type, payload, timestamp: serverTimestamp }
      const beaconKey = [beaconId, 2121, 11, 12]
      const contactedBeaconKey = [contactedBeaconId, 2121, 11, 12]

      it('should emit two events', () => {
        map(doc)
        expect(emitted).to.have.lengthOf(2)
      })

      it('should emit key beaconId,yyyy,mm,dd', () => {
        map(doc)
        expect(emitted.map(({ key }) => key)).to.be.an('array').that.deep.includes(beaconKey)
      })

      it('should emit key contactedBeaconId,yyyy,mm,dd', () => {
        map(doc)
        expect(emitted.map(({ key }) => key)).to.be.an('array').that.deep.includes(contactedBeaconKey)
      })

      it('should emit value for beaconId', () => {
        map(doc)
        expect(emittedValueByKey(beaconKey)).to.be.an('object').that.deep.equals({
          contact: contactedBeaconId,
          distance,
          ms,
        })
      })

      it('should emit value for contactedBeaconId', () => {
        map(doc)
        expect(emittedValueByKey(contactedBeaconKey)).to.be.an('object').that.deep.equals({
          contact: beaconId,
          distance,
          ms,
        })
      })
    })
  })

  describe('reduce', () => {
    it('should convert a mapped to a reduced document', () => {
      const doc = { contact: beaconId, ms, distance }
      const result = reduce(null, [doc], false)
      expect(result).to.be.an('object').that.deep.equals({
        [beaconId]: [
          {
            start: ms,
            end: ms,
            n: 1,
            minDistance: distance,
            maxDistance: distance,
            sumDistance: distance,
          },
        ],
      })
    })

    it('should merge two close docs into an interval', () => {
      const doc1 = { contact: beaconId, ms, distance }
      const doc2 = { contact: beaconId, ms: ms + 60000, distance: 2 * distance }
      const result = reduce(null, [doc1, doc2], false)
      expect(result).to.be.an('object').that.deep.equals({
        [beaconId]: [
          {
            start: ms,
            end: ms + 60000,
            n: 2,
            minDistance: distance,
            maxDistance: 2 * distance,
            sumDistance: 3 * distance,
          },
        ],
      })
    })

    it('should separate two distanced docs into an interval', () => {
      const doc1 = { contact: beaconId, ms, distance }
      const doc2 = { contact: beaconId, ms: ms + 100 * 60000, distance: 2 * distance }
      const result = reduce(null, [doc1, doc2], false)
      expect(result).to.be.an('object').that.deep.equals({
        [beaconId]: [
          {
            start: ms,
            end: ms,
            n: 1,
            minDistance: distance,
            maxDistance: distance,
            sumDistance: distance,
          },
          {
            start: ms + 100 * 60000,
            end: ms + 100 * 60000,
            n: 1,
            minDistance: 2 * distance,
            maxDistance: 2 * distance,
            sumDistance: 2 * distance,
          },
        ],
      })
    })
  })
})
