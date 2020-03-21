import fs from 'fs'

const packageJson = JSON.parse(fs.readFileSync('package.json'))

const getVersion = () => packageJson.version

export {
  getVersion,
}
