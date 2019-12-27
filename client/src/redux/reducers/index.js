// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import { combineReducers } from 'redux'

// Custom file imports
import datasourceReducer from './datasource-reducer.js'
import reportReducer from './report-reducer.js'
import userReducer from './user-reducer.js'
import authReducer from './auth-reducer.js'
import groupReducer from './group-reducer.js'

/// /////////////////////////////////////////////////
// C O M B I N E   R E D U C E R S
/// /////////////////////////////////////////////////

export default combineReducers({
  datasources: datasourceReducer,
  reports: reportReducer,
  users: userReducer,
  auth: authReducer,
  groups: groupReducer
})
