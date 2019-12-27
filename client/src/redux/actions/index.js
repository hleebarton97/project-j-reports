// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
import * as actionTypes from './types.js'

/// /////////////////////////////////////////////////
// A C T I O N   C R E A T O R S
/// /////////////////////////////////////////////////

// Datasources
export const addDatasource = obj => dispatch => { dispatch({ type: actionTypes.ADD_DATASOURCE, payload: obj }) }
export const setDatasources = arry => dispatch => { dispatch({ type: actionTypes.SET_DATASOURCES, payload: arry }) }
export const updateDatasource = obj => dispatch => { dispatch({ type: actionTypes.UPDATE_DATASOURCE, payload: obj }) }
export const removeDatasource = obj => dispatch => { dispatch({ type: actionTypes.REMOVE_DATASOURCE, payload: obj }) }
export const clearDatasources = () => dispatch => { dispatch({ type: actionTypes.CLEAR_DATASOURCES }) }

// Reports
export const addReport = obj => dispatch => { dispatch({ type: actionTypes.ADD_REPORT, payload: obj }) }
export const clearReports = () => dispatch => { dispatch({ type: actionTypes.CLEAR_REPORTS }) }
export const setReports = arry => dispatch => { dispatch({ type: actionTypes.SET_REPORTS, payload: arry }) }
export const removeReport = obj => dispatch => { dispatch({ type: actionTypes.REMOVE_REPORT, payload: obj }) }
export const updateReport = obj => dispatch => { dispatch({ type: actionTypes.UPDATE_REPORT, payload: obj }) }

// Users
export const setUsers = arry => dispatch => { dispatch({ type: actionTypes.SET_USERS, payload: arry }) }
export const updateUser = obj => dispatch => { dispatch({ type: actionTypes.UPDATE_USER, payload: obj }) }
export const clearUsers = () => dispatch => { dispatch({ type: actionTypes.CLEAR_USERS }) }

// Auth
export const loginUser = obj => dispatch => { dispatch({ type: actionTypes.LOGIN_USER, payload: obj }) }
export const logoutUser = () => dispatch => { dispatch({ type: actionTypes.LOGOUT_USER }) }

// Groups
export const addGroup = obj => dispatch => { dispatch({ type: actionTypes.ADD_GROUP, payload: obj }) }
export const setGroups = arry => dispatch => { dispatch({ type: actionTypes.SET_GROUPS, payload: arry }) }
export const updateGroup = obj => dispatch => { dispatch({ type: actionTypes.UPDATE_GROUP, payload: obj }) }
export const removeGroup = obj => dispatch => { dispatch({ type: actionTypes.REMOVE_GROUP, payload: obj }) }
export const clearGroups = () => dispatch => { dispatch({ type: actionTypes.CLEAR_GROUPS }) }
