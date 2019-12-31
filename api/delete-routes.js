// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports

const globals = require('../util/globals.js')
const mysql = require('../util/mysql.js')

// get mysql connection object
const mySqlDB = mysql.createConnection()
mySqlDB.connect(err => {
  if (err) { throw err } else { console.log('My SQL Connected.....') }
})

/// /////////////////////////////////////////////////
// D E L E T E   E N D P O I N T S   D E F I N I T I O N
/// /////////////////////////////////////////////////

module.exports = app => {
  /// /////////////////////////////////////////////////
  // D A T A S O U R C E S
  /// /////////////////////////////////////////////////

  // Delete a datasource by id
  app.delete(`${globals.API_URI}/datasources/:id`,
    (req, res) => {
      const datasourceId = req.params.id
      const sql = 'DELETE FROM ' + globals.SCHEMA + mysql.Datasource + ' WHERE ID = ?'
      mySqlDB.query(sql, datasourceId, (err, result) => {
        if (err) { throw err } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ data: 'datasource deleted' })
          } else {
            res.status(404).json({ error: 'datasource not found' })
          }
        }
      })
    })

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // Delete a user by id
  app.delete(`${globals.API_URI}/users/:id`,
    (req, res) => {
      const userID = req.params.id
      const sql = 'DELETE FROM ' + globals.SCHEMA + mysql.User + ' WHERE ID = ?'
      mySqlDB.query(sql, userID, (err, result) => {
        if (err) { throw err } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ data: 'user deleted' })
          } else {
            res.status(404).json({ error: 'user not found' })
          }
        }
      })
    })

  /// /////////////////////////////////////////////////
  // R E P O R T S
  /// /////////////////////////////////////////////////

  // Delete a report by id
  app.delete(`${globals.API_URI}/reports/:id`,
    (req, res) => {
      const reportID = req.params.id
      const sql = 'DELETE FROM ' + globals.SCHEMA + mysql.Report + ' WHERE ID = ?'
      mySqlDB.query(sql, reportID, (err, result) => {
        if (err) { throw err } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ data: 'report deleted' })
          } else {
            res.status(404).json({ error: 'report not found' })
          }
        }
      })
    })

  /// /////////////////////////////////////////////////
  // G R O U P S
  /// /////////////////////////////////////////////////

  // Delete a group by id
  app.delete(`${globals.API_URI}/groups/:id`,
    (req, res) => {
      const groupID = req.params.id
      const sql = 'DELETE FROM ' + globals.SCHEMA + mysql.Group + ' WHERE ID = ?'
      mySqlDB.query(sql, groupID, (err, result) => {
        if (err) { throw err } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ data: 'group deleted' })
          } else {
            res.status(404).json({ error: 'group not found' })
          }
        }
      })
    })
}
