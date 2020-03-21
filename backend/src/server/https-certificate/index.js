import fs from 'fs'
import Path from 'path'

const getHttpsCertificate = () => ({
  cert: fs.readFileSync(Path.resolve(__dirname, 'test-https.cert.pem')),
  key: fs.readFileSync(Path.resolve(__dirname, 'test-https.priv.pem')),
})

export {
  getHttpsCertificate,
}
