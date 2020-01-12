// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
const globals = require('../util/globals.js')

// not custom
const mysql = require('../db/mysql.js')

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////
const mySqlDB = mysql.createMySQLConnection()
const hash = require('js-sha256')
const crypto = require('crypto')
/// /////////////////////////////////////////////////
// G E T   E N D P O I N T S   D E F I N I T I O N
/// /////////////////////////////////////////////////

// open mysql connection
mySqlDB.connect(err => { if (err) { throw err } else console.log('MySql Connected.......') })

module.exports = app => {
  /// /////////////////////////////////////////////////
  // D A T A S O U R C E S
  /// /////////////////////////////////////////////////

  // Create a datasource
  app.post(`${globals.API_URI}/datasources`,
    (req, res) => {
      var datasource = [req.body.name, req.body.connection_string, req.body.username, req.body.password]
      var dsObj = req.body
      const sql = 'INSERT INTO ' + mysql.SCHEMA + mysql.Datasource +
          ' (' + mysql.inserts.datasource + ') VALUES(?,?,?,?)'
      mySqlDB.query(sql, datasource, (err, result) => {
        if (err) { throw err } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ data: dsObj })
          } else {
            res.status(400).json({ error: 'datasource could not be created' })
          }
        }
      })
    })

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // User sign in
  app.post(`${globals.API_URI}/users/login`,
    (req, res) => {
      const reqObj = req.body
      const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.User + ' WHERE user.Username = ?'
      mySqlDB.query(sql, reqObj.username, function (err, result) {
        if (err) {
          throw err
        } else {
          if (result.length > 0) {
            var loginSaltnHash = getHashedLogin(
              reqObj.password,
              result[0].Password_salt
            )
            var savedPass = result[0].Password
            var userObj = {
              id: result[0].ID,
              user_type_id: result[0].User_type_id
            }
            if (loginSaltnHash === savedPass) {
              res.status(200).json({ data: userObj })
            } else {
              res.status(400).json({ error: 'username and/or password invalid' })
            }
          } else {
            res.status(400).json({ error: 'username and/or password invalid' })
          }
        }
      })
    })

  // Create a user
  app.post(`${globals.API_URI}/users`,
    (req, res) => {
      const reqObj = req.body
      // generate salt
      var salt = getSalt(20)
      var hashedPW = getHashedLogin(reqObj.password, salt)
      var user = [[reqObj.username, hashedPW, salt, reqObj.user_type_id]]
      const sql =
     'INSERT into ' + mysql.SCHEMA + mysql.User + '(' + mysql.inserts.user + ') VALUES ?'
      mySqlDB.query(sql, [user], function (err) {
        if (err) {
          throw err
        } else {
          res.status(200).json({ data: reqObj })
        }
      })
    })

  /// /////////////////////////////////////////////////
  // R E P O R T S
  /// /////////////////////////////////////////////////

  // Test query before report creation
  app.post(`${globals.API_URI}/reports/test`,
    (req, res) => {

    })

  // Create a report
  app.post(`${globals.API_URI}/reports`,
    (req, res) => {
      var report = [req.body.title, req.body.query_string, req.body.desc, JSON.stringify(req.body.result_metadata), req.body.datasource_id]
      var groups = req.body.groups
      var reportObj = req.body

      const sql = 'INSERT INTO ' + mysql.SCHEMA + mysql.Report +
          ' (' + mysql.inserts.report + ') VALUES (?,?,?,?,?)'
      mySqlDB.query(sql, report, (err, result) => {
        if (err) { throw err } else {
          if (result.affectedRows > 0) {
            var reportGroups = {
              id: result.insertId,
              groupID: groups
            }
            addGroupsToReport(reportGroups, function () {})
            res.status(200).json({ data: reportObj })
          } else {
            res.status(400).json({ error: 'report could not be created' })
          }
        }
      })
    })

  // Run a report query
  app.post(`${globals.API_URI}/reports/run`,
    (req, res) => {

    })

  /// /////////////////////////////////////////////////
  // G R O U P S
  /// /////////////////////////////////////////////////

  // Create a group
  app.post(`${globals.API_URI}/groups`,
    (req, res) => {
      var groupName = [req.body.name]
      var groupObj = req.body
      const sql = 'INSERT INTO ' + mysql.SCHEMA + mysql.Group +
          ' (' + mysql.inserts.group + ') VALUES (?)'
      mySqlDB.query(sql, groupName, (err, result) => {
        if (err) { throw err } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ data: groupObj })
          } else {
            res.status(400).json({ error: 'group could not be created' })
          }
        }
      })
    })
}

/// ////////////////////// UTILITY FUNCTIONS /////////////////////////////

// get all groups for a group of users
function addGroupsToReport (report, callback) {
  var pending = report.groupID.length
  var reportID = report.id
  var groupIDs = report.groupID

  for (let i = 0; i < pending; i++) {
    const sql = 'CALL ' + mysql.SCHEMA + 'addGroupsToReport(' + reportID + ', ' + groupIDs[i] + ');'
    mySqlDB.query(sql, (err) => {
      if (err) { /** Need error check possibly for invalid groupID */ } else {
        if (--pending === 0) {
          callback()
        }
      }
    })
  }
}

// SHA-256 hashing function
function getHashedLogin (loginAttempt, savedSalt) {
  // Using SHA-256 hashing algorithm
  return hash(loginAttempt + savedSalt)
}

// generate random salt
function getSalt (length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('ascii') // convert to hexadecimal format
    .slice(0, length) // return required number of characters
}
