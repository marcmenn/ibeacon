import packageJson from '../package.json'

const getVersion = () => packageJson.version

export {
  getVersion,
}
