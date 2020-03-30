import chai from 'chai'

import map, { key } from '../../../src/database/views/contact-report/map.js'
import reduce from '../../../src/database/views/contact-report/reduce.js'
import contactEvents from '../../test-api/contact-events.js'
import View from '../../test-api/views.js'

const { expect } = chai

describe('actions.report', () => {
  const beaconId = 'beaconId'
  const serverTimestamp = new Date('2020-02-02T02:02:02.000Z')
  const delta = 7 * 24 * 60
  const clientTimestamp = new Date(serverTimestamp.getTime() + delta * 60000)
  const ms = clientTimestamp.getTime()
  const distance = 5
  const view = new View(map, reduce)

  afterEach(() => view.clear())

  describe('map', () => {
    describe('happy path', () => {
      const contactedBeaconId = 'contactedBeaconId'
      const beaconKey = key(beaconId, clientTimestamp)
      const contactedBeaconKey = key(contactedBeaconId, clientTimestamp)
      const mapDoc = () => contactEvents(view, serverTimestamp, `0/${delta}:beaconId-contactedBeaconId(5)`)

      it('should emit two events', () => {
        mapDoc()
        expect(view.size).to.eq(2)
      })

      it('should emit key beaconId,yyyy,mm,dd', () => {
        mapDoc()
        expect(view.rows(beaconKey)).to.be.an('array').that.has.lengthOf(1)
      })

      it('should emit key contactedBeaconId,yyyy,mm,dd', () => {
        mapDoc()
        expect(view.rows(contactedBeaconKey)).to.be.an('array').that.has.lengthOf(1)
      })

      it('should emit value for beaconId', () => {
        mapDoc()
        expect(view.rows(beaconKey)).to.be.an('array').that.deep.equals([{
          contact: contactedBeaconId,
          distance,
          ms,
        }])
      })

      it('should emit value for contactedBeaconId', () => {
        mapDoc()
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
    let timestamps = null

    beforeEach(() => {
      timestamps = contactEvents(view, clientTimestamp, `0:a-b
60:a-c
120:b-e
180:a-d`)
    })

    it('should contain all contacts', () => {
      const [t0, t1,, t3] = timestamps
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
