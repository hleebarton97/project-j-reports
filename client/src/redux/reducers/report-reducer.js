// Developed by
// Henry Lee Barton III

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
import {
  ADD_REPORT,
  SET_REPORTS,
  REMOVE_REPORT,
  CLEAR_REPORTS,
  UPDATE_REPORT
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
    // Add report to store
    case ADD_REPORT: { // Payload is report object
      const newData = [...state.data]
      newData.push(action.payload)
      return Object.assign({}, state, {
        data: newData
      })
    }
    // Set reports from database
    case SET_REPORTS: { // Payload is reports array
      return Object.assign({}, state, {
        data: action.payload
      })
    }
    // Update existing report
    case UPDATE_REPORT: { // Payload is index of datasource & report obj
      const updatedData = [...state.data]
      updatedData[action.payload.index] = action.payload.report
      return Object.assign({}, state, {
        data: updatedData
      })
    }
    // Remove report from store
    case REMOVE_REPORT: {
      return Object.assign({}, state, {
        data: [...state.data].filter(report => {
          return Number(report.report_id) !== Number(action.payload.report_id)
        })
      })
    }
    case CLEAR_REPORTS:
      return Object.assign({}, state, INITIAL_STATE)
    default:
      return state
  }
}
