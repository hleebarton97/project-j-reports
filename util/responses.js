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

const failResponse = {
  error: {
    message: '',
    status_code: ''
  }
}

const successResponse = {
  data: {}
}

/// /////////////////////////////////////////////////
/// RESPONSE OBJECT PROPERTY DEFINITIONS & METHODS
/// ////////////////////////////////////////////////

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
    UNAUTH: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    UNPROCESS: 422
  },

  SERVER_ERROR: {
    INTERNAL: 500
  },

  // response method definitions

  // response body for delete request methods
  getDeletedResponse: (type, id, result) => {
    if (result === 200) {
      deletedRespOK.data.message = type + ' deleted'
      return deletedRespOK
    } else if (result === 404) {
      deletedRespNotFound.error.id = id
      deletedRespNotFound.error.message = type + ' not found'
      return deletedRespNotFound
    }
  },

  // response body for post request methods
  getPostRespSuccess: postObj => {
    successResponse.data = postObj
    return successResponse
  },

  getPostRespFail: (code, message) => {
    failResponse.error.message = message
    failResponse.error.status_code = code
    return failResponse
  }
}
