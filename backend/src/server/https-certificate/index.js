import fs from 'fs'
import Path from 'path'

const CERTIFICATE_DIR = './src/server/https-certificate'

const getHttpsCertificate = () => ({
  cert: fs.readFileSync(Path.resolve(CERTIFICATE_DIR, 'test-https.cert.pem')),
  key: fs.readFileSync(Path.resolve(CERTIFICATE_DIR, 'test-https.priv.pem')),
})

export {
  getHttpsCertificate,
}
