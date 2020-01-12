// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
const globals = require('../util/globals.js')
const mysql = require('../db/mysql.js')
const queryUtil = require('../util/db-utility.js')
/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

/// /////////////////////////////////////////////////
// G E T   E N D P O I N T S   D E F I N I T I O N
/// /////////////////////////////////////////////////

module.exports = (app, mySqlDB) => {
  /// /////////////////////////////////////////////////
  // D A T A S O U R C E S
  /// /////////////////////////////////////////////////

  // Get all datasources

  // Get a datasource by id

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // Get all users
  app.get(`${globals.API_URI}/users`, (req, res) => {
    var userArr = []
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.User
    mySqlDB.query(sql, function (err, result) {
      if (err) throw err
      else {
        if (result.length > 0) {
          for (var i in result) {
            userArr.push(
              {
                id: result[i].ID,
                username: result[i].Username,
                user_type_id: result[i].User_type_id
              }
            )
          }
          queryUtil.getGroups(mySqlDB, userArr, 0, function () {
            res.status(200).json({ data: userArr })
          })
        } else {
          res.status(404).json({ data: 'no users found' })
        }
      }
    })
  })

  // Get a user by id

  /// /////////////////////////////////////////////////
  // R E P O R T S
  /// /////////////////////////////////////////////////

  // Get all reports
  app.get(`${globals.API_URI}/reports`, (req, res) => {
    var reportArr = []
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Report
    mySqlDB.query(sql, (err, result) => {
      if (err) { throw err } else {
        if (result.length > 0) {
          for (var i in result) {
            reportArr.push(
              {
                id: result[i].ID,
                title: result[i].Title,
                desc: result[i].Description,
                query_string: result[i].Query,
                datasource_id: result[i].connection_ID,
                result_metadata: JSON.parse(result[i].Metadata)
              }
            )
          }
          queryUtil.getGroups(mySqlDB, reportArr, 1, function () {
            res.status(200).json({ data: reportArr })
          })
        } else {
          res.status(404).json({ data: 'no reports found' })
        }
      }
    })
  })

  // Get all reports by user id
  /// //
  app.get(`${globals.API_URI}/reports/:id`, (req, res) => {
    var reportID = req.params.id
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Report + ' WHERE ID = ?'
    mySqlDB.query(sql, reportID, (err, result) => {
      if (err) { throw err } else {
        if (result.length > 0) {
          const sql2 =
              'SELECT * FROM ' + mysql.SCHEMA + mysql.Reportgroup + ' WHERE report_group.report_ID = ?'
          mySqlDB.query(sql2, reportID, function (err, result2) {
            if (err) { throw err } else {
              var groups = []
              for (var i = 0; i < result2.length; i++) {
                groups.push(
                  {
                    id: result2[i].group_ID,
                    name: result2[i].group_Name
                  })
              }
              var reportObj = {
                id: result[0].ID,
                title: result[0].Title,
                desc: result[0].Description,
                query_string: result[0].Query,
                datasource_id: result[0].connection_ID,
                result_metadata: JSON.parse(result[0].Metadata),
                groups: groups
              }
              res.status(200).json({ data: reportObj })
            }
          })
        } else {
          res.status(400).json({ data: 'Report not found' })
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // G R O U P S
  /// /////////////////////////////////////////////////

  // Get all groups

  // Get a group by id
  app.get(`${globals.API_URI}/groups/:id`, (req, res) => {
    var groupId = req.params.id
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Group + ' WHERE ID = ?'
    mySqlDB.query(sql, groupId, (err, result) => {
      if (err) { throw err } else {
        if (result.length > 0) res.status(200).json({ data: result })
        else res.status(404).json({ data: 'Group not found' })
      }
    })
  })
}
