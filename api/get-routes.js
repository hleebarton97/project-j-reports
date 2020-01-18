// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
const globals = require('../util/globals.js')
const mysql = require('../db/mysql.js')
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
  app.get(`${globals.API_URI}/datasources`, (req, res) => {
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Datasource
    mySqlDB.query(sql, (err, result) => {
      if (err) { throw err } else {
        if (result.length > 0) {
          res.status(200).json({ data: result })
        } else {
          res.status(404).json({ data: 'no datsources found' })
        }
      }
    })
  })

  // Get a datasource by id
  app.get(`${globals.API_URI}/datasources/:id`, (req, res) => {
    var datasourceID = req.params.id
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Datasource + ' WHERE ID = ?'
    mySqlDB.query(sql, datasourceID, function (err, result) {
      if (err) {
        throw err
      } else {
        if (result.length > 0) {
          var datasourceObj = result[0]
          res.status(200).json({ data: datasourceObj })
        } else {
          res.status(404).json({ data: 'datasource not found' })
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // Get all users
  app.get(`${globals.API_URI}/users`, (req, res) => {})

  // Get a user by id
  app.get(`${globals.API_URI}/users/:id`, (req, res) => {
    var userID = req.params.id
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.User + ' WHERE ID = ?'
    mySqlDB.query(sql, userID, function (err, result) {
      if (err) {
        throw err
      } else {
        if (result.length > 0) {
          const sql2 =
              'SELECT * FROM ' + mysql.SCHEMA + mysql.Usergroup + ' WHERE user_group.user_ID = ?'
          mySqlDB.query(sql2, userID, function (err, result2) {
            if (err) throw err
            else {
              var groups = []
              for (var i = 0; i < result2.length; i++) {
                groups.push(
                  {
                    id: result2[i].group_ID,
                    name: result2[i].group_Name
                  })
              }
              var userObj = {
                id: result[0].ID,
                username: result[0].Username,
                user_type_id: result[0].User_type_id,
                groups: groups
              }
              res.status(200).json({ data: userObj })
            }
          })
        } else {
          res.status(404).json({ data: 'user not found' })
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // R E P O R T S
  /// /////////////////////////////////////////////////

  // Get all reports
  app.get(`${globals.API_URI}/reports`, (req, res) => {})

  // Get all reports by user id
  app.get(`${globals.API_URI}/reports/:id`, (req, res) => {
    // let reportId = req.params.id
  })

  /// /////////////////////////////////////////////////
  // G R O U P S
  /// /////////////////////////////////////////////////

  // Get all groups
  app.get(`${globals.API_URI}/groups`, (req, res) => {
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Group
    mySqlDB.query(sql, (err, result) => {
      if (err) throw err
      else {
        if (result.length > 0) res.status(200).json({ data: result })
        else res.status(404).json({ data: 'No groups found' })
      }
    })
  })

  // Get a group by id
  app.get(`${globals.API_URI}/groups/:id`, (req, res) => {
    // let groupId = req.params.id
  })
}
