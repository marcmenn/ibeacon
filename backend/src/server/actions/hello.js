import { getVersion } from '../../get-version'

export default (req, res) => {
  res.send({
    name: 'ibeacon API',
    version: getVersion(),
  })
}
