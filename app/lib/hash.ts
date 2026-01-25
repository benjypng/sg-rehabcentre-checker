import crypto from 'crypto'

export const getHashedPassword = (password: string) => {
  const sha256 = crypto.createHash('sha256')
  const hash = sha256.update(password).digest('base64')
  return hash
}
