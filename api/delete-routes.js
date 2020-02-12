// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports

const globals = require('../util/globals.js')
const response = require('../util/responses.js')
const mysql = require('../db/mysql')

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

/// /////////////////////////////////////////////////
// D E L E T E   E N D P O I N T S   D E F I N I T I O N
/// /////////////////////////////////////////////////

module.exports = (app, mySqlDB) => {
  /// /////////////////////////////////////////////////
  // D A T A S O U R C E S
  /// /////////////////////////////////////////////////
  let responseObj = {}
  // Delete a datasource by id
  app.delete(`${globals.API_URI}/datasources/:id`, (req, res) => {
    const datasourceId = req.params.id

    const sql =
      'DELETE FROM ' + mysql.SCHEMA + mysql.Datasource + ' WHERE ID = ?'
    mySqlDB.query(sql, datasourceId, (err, result) => {
      if (err) {
        responseObj = response.getPostRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.affectedRows > 0) {
          responseObj = response.getDeletedRespSuccess(globals.DS)
          res.status(response.SUCCESS.OK).json(responseObj)
        } else if (result.affectedRows === 0) {
          responseObj = response.getRespFailID(datasourceId, response.ERROR.NOT_FOUND)
          res.status(response.ERROR.NOT_FOUND).json(responseObj)
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // Delete a user by id
  app.delete(`${globals.API_URI}/users/:id`, (req, res) => {
    const userID = req.params.id
    const sql = 'DELETE FROM ' + mysql.SCHEMA + mysql.User + ' WHERE ID = ?'
    mySqlDB.query(sql, userID, (err, result) => {
      if (err) {
        responseObj = response.getPostRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.affectedRows > 0) {
          responseObj = response.getDeletedRespSuccess(globals.USR)
          res.status(response.SUCCESS.OK).json(responseObj)
        } else if (result.affectedRows === 0) {
          responseObj = response.getRespFailID(userID, response.ERROR.NOT_FOUND)
          res.status(response.ERROR.NOT_FOUND).json(responseObj)
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // R E P O R T S
  /// /////////////////////////////////////////////////

  // Delete a report by id
  app.delete(`${globals.API_URI}/reports/:id`, (req, res) => {
    const reportID = req.params.id
    const sql = 'DELETE FROM ' + mysql.SCHEMA + mysql.Report + ' WHERE ID = ?'
    mySqlDB.query(sql, reportID, (err, result) => {
      if (err) {
        responseObj = response.getPostRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.affectedRows > 0) {
          responseObj = response.getDeletedRespSuccess(globals.RPT)
          res.status(response.SUCCESS.OK).json(responseObj)
        } else if (result.affectedRows === 0) {
          responseObj = response.getRespFailID(reportID, response.ERROR.NOT_FOUND)
          res.status(response.ERROR.NOT_FOUND).json(responseObj)
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // G R O U P S
  /// /////////////////////////////////////////////////

  // Delete a group by id
  app.delete(`${globals.API_URI}/groups/:id`, (req, res) => {
    const groupID = req.params.id
    const sql = 'DELETE FROM ' + mysql.SCHEMA + mysql.Group + ' WHERE ID = ?'
    mySqlDB.query(sql, groupID, (err, result) => {
      if (err) {
        responseObj = response.getPostRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.affectedRows > 0) {
          responseObj = response.getDeletedRespSuccess(globals.GRP)
          res.status(response.SUCCESS.OK).json(responseObj)
        } else if (result.affectedRows === 0) {
          responseObj = response.getRespFailID(groupID, response.ERROR.NOT_FOUND)
          res.status(response.ERROR.NOT_FOUND).json(responseObj)
        }
      }
    })
  })
}
