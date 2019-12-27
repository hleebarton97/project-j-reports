// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
import {
  SET_USERS,
  UPDATE_USER,
  CLEAR_USERS
} from '../actions/types.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

const INITIAL_STATE = { data: [] }

/// /////////////////////////////////////////////////
// R E D U C E R   D E F I N T I O N
/// /////////////////////////////////////////////////

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Set users from database
    case SET_USERS: { // Payload is array of users
      return Object.assign({}, state, {
        data: action.payload
      })
    }
    case UPDATE_USER: { // Payload is index of user
      const updatedUsers = [...state.data]
      updatedUsers[action.payload.index] = action.payload.user
      return Object.assign({}, state, {
        data: updatedUsers
      })
    }
    // Remove all user data from store
    case CLEAR_USERS:
      return Object.assign({}, state, INITIAL_STATE)
    default:
      return state
  }
}
