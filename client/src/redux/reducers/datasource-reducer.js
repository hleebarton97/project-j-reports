// Developed by
// Henry Lee Barton III

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
import {
  ADD_DATASOURCE,
  SET_DATASOURCES,
  UPDATE_DATASOURCE,
  REMOVE_DATASOURCE,
  CLEAR_DATASOURCES
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
    // Add datasource to store
    case ADD_DATASOURCE: { // Payload is datasource object
      const newData = [...state.data]
      newData.push(action.payload)
      return Object.assign({}, state, {
        data: newData
      })
    }
    // Set datasources from database
    case SET_DATASOURCES: { // Payload is array of datasources
      return Object.assign({}, state, {
        data: action.payload
      })
    }
    case UPDATE_DATASOURCE: { // Payload is index of datasource & datasource obj
      const updatedData = [...state.data]
      updatedData[action.payload.index] = action.payload.datasource
      return Object.assign({}, state, {
        data: updatedData
      })
    }
    // Remove datasource from store
    case REMOVE_DATASOURCE: { // Payload is datasource object
      return Object.assign({}, state, {
        data: [...state.data].filter(datasource => {
          return Number(datasource.id) !== Number(action.payload.id)
        })
      })
    // Remove all datasource data from store
    }
    case CLEAR_DATASOURCES:
      return Object.assign({}, state, INITIAL_STATE)
    default:
      return state
  }
}
