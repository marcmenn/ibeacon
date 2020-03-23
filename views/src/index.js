import path from 'path'
import fs from 'fs'
import prepare from './prepare.js'

const run = async () => {
  const viewsFile = path.resolve(process.argv[2])
  const input = JSON.parse(fs.readFileSync(viewsFile))
  const result = await prepare(path.dirname(viewsFile), input)
  console.log(JSON.stringify(result))
}

run().catch(e => {
  console.error(e)
  process.exitCode = 1
})
