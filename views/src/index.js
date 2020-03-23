import prepare from './prepare.js'

const run = async () => {
  const input = {
    contactReport: {
      map: 'views/contact-report/map.js',
      reduce: 'views/contact-report/reduce.js',
    },
    healthReport: {
      map: 'views/health-report/map.js',
      reduce: 'views/health-report/reduce.js',
    },
    contactByBeacon: {
      map: 'views/contact-by-beacon/map.js',
      reduce: 'views/contact-by-beacon/reduce.js',
    },
    healthStateByBeacon: {
      map: 'views/health-state-by-beacon/map.js',
      reduce: 'views/health-state-by-beacon/reduce.js',
    },
  }
  console.log(JSON.stringify(await prepare(input)))
}

run().catch(e => {
  console.error(e)
  process.exitCode = 1
})
