/// /////////////////////////////////////////////////
/// RESPONSE OBJECT DECLARATIONS
/// ////////////////////////////////////////////////
const deletedRespOK = {
  data: {
    message: ''
  }
}

const deletedRespNotFound = {
  error: {
    id: '',
    message: ''
  }
}

module.exports = {

  // HTTP RESPONSE CODES
  SUCCESS: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204
  },

  ERROR: {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESS: 422
  },

  SERVER_ERROR: {
    INTERNAL: 500
  },

  // response method definitions
  getDeletedResponse: (type, id, result) => {
    if (result === 200) {
      deletedRespOK.data.message = type + ' deleted'
      return deletedRespOK
    } else if (result === 404) {
      deletedRespNotFound.error.id = id
      deletedRespNotFound.error.message = type + ' not found'
      return deletedRespNotFound
    }
  }
}
