// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
const globals = require('../util/globals.js')
const mysql = require('../db/mysql.js')
const queryUtil = require('../util/db-utility.js')
const response = require('../util/responses')
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
  let responseObj = {}
  // Get all datasources
  app.get(`${globals.API_URI}/datasources`, (req, res) => {
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Datasource
    mySqlDB.query(sql, (err, result) => {
      if (err) {
        responseObj = response.getRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.length > 0) {
          responseObj = response.getRespSuccess(result)
          res.status(response.SUCCESS.OK).json(responseObj)
        } else if (result.length === 0) {
          // empty table
          responseObj = response.getRespSuccess(result)
          res.status(response.SUCCESS.OK).json(responseObj)
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
        responseObj = response.getRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.length > 0) {
          var datasourceObj = result[0]
          responseObj = response.getRespSuccess(datasourceObj)
          res.status(response.SUCCESS.OK).json(responseObj)
        } else if (result.length === 0) {
          // id not found in table
          responseObj = response.getRespFailID(datasourceID, response.ERROR.NOT_FOUND)
          res.status(response.ERROR.NOT_FOUND).json(responseObj)
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // Get all users
  app.get(`${globals.API_URI}/users`, (req, res) => {
    var userArr = []
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.User
    mySqlDB.query(sql, function (err, result) {
      if (err) {
        responseObj = response.getRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.length > 0) {
          for (var i in result) {
            userArr.push({
              id: result[i].ID,
              username: result[i].Username,
              user_type_id: result[i].User_type_id
            })
          }
          queryUtil.getGroups(mySqlDB, userArr, 0, function () {
            responseObj = response.getRespSuccess(userArr)
            res.status(response.SUCCESS.OK).json(responseObj)
          })
        } else if (result.length === 0) {
          // empty table
          responseObj = response.getRespSuccess(userArr)
          res.status(response.SUCCESS.OK).json(responseObj)
        }
      }
    })
  })

  // Get a user by id
  app.get(`${globals.API_URI}/users/:id`, (req, res) => {
    var userID = req.params.id
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.User + ' WHERE ID = ?'
    mySqlDB.query(sql, userID, function (err, result) {
      if (err) {
        responseObj = response.getRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.length > 0) {
          const sql2 = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Usergroup + ' WHERE user_group.user_ID = ?'
          mySqlDB.query(sql2, userID, function (err, result2) {
            if (err) throw err
            else {
              var groups = []
              for (var i = 0; i < result2.length; i++) {
                groups.push({
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
              responseObj = response.getRespSuccess(userObj)
              res.status(response.SUCCESS.OK).json(responseObj)
            }
          })
        } else if (result.length === 0) {
          // id not found in table
          responseObj = response.getRespFailID(userID, response.ERROR.NOT_FOUND)
          res.status(response.ERROR.NOT_FOUND).json(responseObj)
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // R E P O R T S
  /// /////////////////////////////////////////////////

  // Get all reports
  app.get(`${globals.API_URI}/reports`, (req, res) => {
    var reportArr = []
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Report
    mySqlDB.query(sql, (err, result) => {
      if (err) {
        responseObj = response.getRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.length > 0) {
          for (var i in result) {
            reportArr.push({
              id: result[i].ID,
              title: result[i].Title,
              desc: result[i].Description,
              query_string: result[i].Query,
              datasource_id: result[i].connection_ID,
              result_metadata: JSON.parse(result[i].Metadata)
            })
          }
          queryUtil.getGroups(mySqlDB, reportArr, 1, function () {
            responseObj = response.getRespSuccess(reportArr)
            res.status(response.SUCCESS.OK).json(responseObj)
          })
        } else if (result.length === 0) {
          responseObj = response.getRespSuccess(reportArr)
          res.status(response.SUCCESS.OK).json(responseObj)
        }
      }
    })
  })

  // Get all reports by user id
  app.get(`${globals.API_URI}/reports/:id`, (req, res) => {
    var reportID = req.params.id
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Report + ' WHERE ID = ?'
    mySqlDB.query(sql, reportID, (err, result) => {
      if (err) {
        responseObj = response.getRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.length > 0) {
          const sql2 = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Reportgroup + ' WHERE report_group.report_ID = ?'
          mySqlDB.query(sql2, reportID, function (err, result2) {
            if (err) {
              throw err
            } else {
              var groups = []
              for (var i = 0; i < result2.length; i++) {
                groups.push({
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
              responseObj = response.getRespSuccess(reportObj)
              res.status(response.SUCCESS.OK).json(responseObj)
            }
          })
        } else if (result.length === 0) {
          // id not found in table
          responseObj = response.getRespFailID(reportID, response.ERROR.NOT_FOUND)
          res.status(response.ERROR.NOT_FOUND).json(responseObj)
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // G R O U P S
  /// /////////////////////////////////////////////////

  // Get all groups
  app.get(`${globals.API_URI}/groups`, (req, res) => {
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Group
    mySqlDB.query(sql, (err, result) => {
      if (err) {
        responseObj = response.getRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.length > 0) {
          responseObj = response.getRespSuccess(result)
          res.status(response.SUCCESS.OK).json(responseObj)
        } else if (result.length === 0) {
          // empty table
          responseObj = response.getRespSuccess(result)
          res.status(response.SUCCESS.OK).json(responseObj)
        }
      }
    })
  })

  // Get a group by id
  app.get(`${globals.API_URI}/groups/:id`, (req, res) => {
    var groupId = req.params.id
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.Group + ' WHERE ID = ?'
    mySqlDB.query(sql, groupId, (err, result) => {
      if (err) {
        responseObj = response.getRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.length > 0) {
          responseObj = response.getRespSuccess(result)
          res.status(response.SUCCESS.OK).json(responseObj)
        } else if (result.length === 0) {
          // id not found in table
          responseObj = response.getRespFailID(groupId, response.ERROR.NOT_FOUND)
          res.status(response.ERROR.NOT_FOUND).json(responseObj)
        }
      }
    })
  })
}
