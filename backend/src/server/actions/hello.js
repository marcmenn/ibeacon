import { getVersion } from '../../get-version.js'

export default async (req, res) => {
  res.send({
    name: 'ibeacon API',
    version: getVersion(),
  })
}
