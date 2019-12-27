// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
import {
  ADD_GROUP,
  SET_GROUPS,
  UPDATE_GROUP,
  REMOVE_GROUP,
  CLEAR_GROUPS
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
    // Add group to store
    case ADD_GROUP: { // Payload is datasource object
      const newData = [...state.data]
      newData.push(action.payload)
      return Object.assign({}, state, {
        data: newData
      })
    }
    // Set groups from database
    case SET_GROUPS: { // Payload is array of datasources
      return Object.assign({}, state, {
        data: action.payload
      })
    }
    case UPDATE_GROUP: { // Payload is index of group & group obj
      const updatedData = [...state.data]
      updatedData[action.payload.index] = action.payload.group
      return Object.assign({}, state, {
        data: updatedData
      })
    }
    // Remove group from store
    case REMOVE_GROUP: { // Payload is datasource object
      return Object.assign({}, state, {
        data: [...state.data].filter(datasource => {
          return Number(datasource.id) !== Number(action.payload.id)
        })
      })
      // Remove all group data from store
    }
    case CLEAR_GROUPS:
      return Object.assign({}, state, INITIAL_STATE)
    default:
      return state
  }
}
