const hash = require('js-sha256')
const crypto = require('crypto')

module.exports = {
  // SHA-256 hashing function
  hash256: (loginAttempt, savedSalt) => {
    // Using SHA-256 hashing algorithm
    return hash(loginAttempt + savedSalt)
  },

  // generate random salt
  getSalt: length => {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('ascii') // convert to hexadecimal format
      .slice(0, length) // return required number of characters
  }
}
