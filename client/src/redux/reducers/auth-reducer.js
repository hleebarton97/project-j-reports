// Developed by
// Henry Lee Barton III

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
import {
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/types.js'
import { session } from '../../react/util/auth-util.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

const INITIAL_STATE = { data: null }

/// /////////////////////////////////////////////////
// R E D U C E R   D E F I N T I O N
/// /////////////////////////////////////////////////

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Set logged in user data
    case LOGIN_USER: {
      session.setAuthStatus(action.payload)
      return Object.assign({}, state, {
        data: action.payload
      })
    }
    case LOGOUT_USER: {
      session.setAuthStatus(null)
      return Object.assign({}, state, {
        data: null
      })
    }
    default:
      return state
  }
}
