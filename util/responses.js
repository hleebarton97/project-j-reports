/// /////////////////////////////////////////////////
/// RESPONSE OBJECT DECLARATIONS
/// ////////////////////////////////////////////////
const failResponse = {
  error: {
    message: '',
    status_code: ''
  }
}

const successResponse = {
  data: {}
}

const deleteRespOK = {
  data: {
    message: ''
  }
}

const deleteRespIdFail = {
  error: {
    message: {
      id: ''
    },
    status_code: ''
  }
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
  getDeletedRespSuccess: type => {
    deleteRespOK.data.message = type + ' deleted'
    return deleteRespOK
  },

  getDeletedRespFail: (id, code) => {
    deleteRespIdFail.error.message.id = '{' + id + '} is not valid record in database'
    deleteRespIdFail.error.status_code = code
    return deleteRespIdFail
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
