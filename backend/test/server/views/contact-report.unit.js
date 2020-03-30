import chai from 'chai'

import map, { key } from '../../../src/database/views/contact-report/map.js'
import reduce from '../../../src/database/views/contact-report/reduce.js'
import View from '../../test-api/views.js'

const { expect } = chai

const ts = (date) => new Date(date).toISOString()

const event = (
  serverTimestamp,
  beaconId,
  contactedBeaconId,
  distance = 10,
  clientTimestamp = serverTimestamp,
) => {
  const type = 'contact'
  const payload = { beaconId, contactedBeaconId, timestamp: ts(clientTimestamp), distance }
  return { type, payload, timestamp: ts(serverTimestamp) }
}

describe('view.contact-report', () => {
  const beaconId = 'beaconId'
  const clientTimestamp = '2121-12-12T12:12:12.000Z'
  const ms = new Date(clientTimestamp).getTime()
  const distance = 5
  const view = new View(map, reduce)

  afterEach(() => view.clear())

  describe('map', () => {
    describe('happy path', () => {
      const serverTimestamp = '2020-02-02T02:02:02.000Z'
      const contactedBeaconId = 'contactedBeaconId'
      const doc = event(serverTimestamp, beaconId, contactedBeaconId, distance, clientTimestamp)
      const beaconKey = [beaconId, 2121, 11, 12]
      const contactedBeaconKey = [contactedBeaconId, 2121, 11, 12]

      it('should emit two events', () => {
        view.map(doc)
        expect(view.size).to.eq(2)
      })

      it('should emit key beaconId,yyyy,mm,dd', () => {
        view.map(doc)
        expect(view.rows(beaconKey)).to.be.an('array').that.has.lengthOf(1)
      })

      it('should emit key contactedBeaconId,yyyy,mm,dd', () => {
        view.map(doc)
        expect(view.rows(contactedBeaconKey)).to.be.an('array').that.has.lengthOf(1)
      })

      it('should emit value for beaconId', () => {
        view.map(doc)
        expect(view.rows(beaconKey)).to.be.an('array').that.deep.equals([{
          contact: contactedBeaconId,
          distance,
          ms,
        }])
      })

      it('should emit value for contactedBeaconId', () => {
        view.map(doc)
        expect(view.rows(contactedBeaconKey)).to.be.an('array').that.deep.equals([{
          contact: beaconId,
          distance,
          ms,
        }])
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

  describe('report', () => {
    const date = new Date(clientTimestamp).getTime()
    const timestamp = (hours = 0) => date + hours * 3600000
    const t0 = timestamp()
    const t1 = timestamp(1)
    const t2 = timestamp(2)
    const t3 = timestamp(3)

    beforeEach(() => {
      view.map(event(t0, 'a', 'b'))
      view.map(event(t1, 'a', 'c'))
      view.map(event(t2, 'b', 'e'))
      view.map(event(t3, 'a', 'd'))
    })

    it('should contain all contacts', () => {
      const report = view.reduce(key('a', new Date(t0)))
      const common = {
        n: 1,
        minDistance: 10,
        maxDistance: 10,
        sumDistance: 10,
      }
      expect(report).to.be.an('object')
      expect(report).to.have.a.property('b').that.is.an('array').and.deep.includes({
        start: t0,
        end: t0,
        ...common,
      })
      expect(report).to.have.a.property('c').that.is.an('array').and.deep.includes({
        start: t1,
        end: t1,
        ...common,
      })
      expect(report).to.have.a.property('d').that.is.an('array').and.deep.includes({
        start: t3,
        end: t3,
        ...common,
      })
      expect(report).to.not.have.a.property('e')
    })
  })
})
