// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
const globals = require('../util/globals.js')
const mysql = require('../db/mysql.js')
const queryUtil = require('../util/db-utility.js')
const security = require('../util/authentication')
const response = require('../util/responses.js')

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////
const MSG = {
  LOGIN_FAIL: 'username and/or password already exists',
  SERV_ERR: 'Internal Server Error',
  EMAIL_EXIST: 'Email provided already in use'
}
/// /////////////////////////////////////////////////
// G E T   E N D P O I N T S   D E F I N I T I O N
/// /////////////////////////////////////////////////

module.exports = (app, mySqlDB) => {
  /// /////////////////////////////////////////////////
  // D A T A S O U R C E S
  /// /////////////////////////////////////////////////
  let responseObj = {}
  // Create a datasource
  app.post(`${globals.API_URI}/datasources`, (req, res) => {
    const datasource = [req.body.name, req.body.connection_string, req.body.username, req.body.password]
    const dsObj = req.body

    const sql =
      'INSERT INTO ' + mysql.SCHEMA + mysql.Datasource + ' (' + mysql.tableColumns.datasource + ') VALUES(?,?,?,?)'
    mySqlDB.query(sql, datasource, (err, result) => {
      if (err) {
        responseObj = response.getPostRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.affectedRows > 0) {
          responseObj = response.getPostRespSuccess(dsObj)
          res.status(response.SUCCESS.CREATED).json(responseObj)
        } else {
          responseObj = response.getPostRespFail(response.SERVER_ERROR.INTERNAL, MSG.SERV_ERR)
          res.status(response.SERVER_ERROR.INTERNAL).json(responseObj)
        }
      }
    })
  })

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // User sign in
  app.post(`${globals.API_URI}/users/login`, (req, res) => {
    const reqObj = req.body
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + mysql.User + ' WHERE user.Username = ?'
    mySqlDB.query(sql, reqObj.username, function (err, result) {
      if (err) {
        responseObj = response.getPostRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.length > 0) {
          var loginSaltnHash = security.hash256(reqObj.password, result[0].Password_salt)
          var savedPass = result[0].Password
          var userObj = {
            id: result[0].ID,
            user_type_id: result[0].User_type_id
          }
          if (loginSaltnHash === savedPass) {
            responseObj = response.getPostRespSuccess(userObj)
            res.status(response.SUCCESS.OK).json(responseObj)
          } else {
            // password invalid
            responseObj = response.getPostRespFail(response.ERROR.UNAUTH, MSG.LOGIN_FAIL)
            res.status(response.ERROR.UNAUTH).json(responseObj)
          }
        } else {
          // username does not exist
          responseObj = response.getPostRespFail(response.ERROR.UNAUTH, MSG.LOGIN_FAIL)
          res.status(response.ERROR.UNAUTH).json(responseObj)
        }
      }
    })
  })

  // sign a user up
  app.post(`${globals.API_URI}/users/signup`, (req, res) => {
    const reqObj = req.body
    // generate salt
    var salt = security.getSalt(20)
    var hashedPW = security.hash256(reqObj.password, salt)
    var user = [[reqObj.username, hashedPW, salt, reqObj.user_type_id, reqObj.user_email]]
    const sql = 'INSERT into ' + mysql.SCHEMA + mysql.User + '(' + mysql.tableColumns.user + ') VALUES ?'
    mySqlDB.query(sql, [user], function (err) {
      if (err) {
        throw err
      } else {
        response.SUCCESS_RESP200.data = reqObj
        res.status(200).json(response.SUCCESS_RESP200)
      }
    })
  })

  // Create a user input params(username, email)
  app.post(`${globals.API_URI}/users/create`, (req, res) => {
    const reqObj = [req.body.username, req.body.user_email]
    console.log(reqObj)
    // get email and check db for already existing email
    /// 1. check user table
    queryUtil.checkUserExistence(mySqlDB, reqObj[1], function (result) {
      if (result) {
        responseObj = response.getPostRespFail(response.ERROR.FORBIDDEN, MSG.EMAIL_EXIST)
        res.status(response.ERROR.FORBIDDEN).json(responseObj)
      } else {
        // Insert new user into newusertable
        // const sql = 'INSERT INTO ' + mysql.SCHEMA + mysql.NewUser + ' VALUES (?,?)'
        // mySqlDB.query(sql, [reqObj], (err, results) => {
        //   if (err) { throw err } else {
        // if result.alterdRows is > 0 then it is successful
        // else check error, respond accordingly
        //  }
        //  })
      }
    })

    /// 2. check new user_table

    // if email exists, send user email
    /// if email message succeeds, add to new user table
  })
  /// /////////////////////////////////////////////////
  // R E P O R T S
  /// /////////////////////////////////////////////////

  // Test query before report creation
  app.post(`${globals.API_URI}/reports/test`, (req, res) => {})

  // Create a report
  app.post(`${globals.API_URI}/reports`, (req, res) => {
    var report = [
      req.body.title,
      req.body.query_string,
      req.body.desc,
      JSON.stringify(req.body.result_metadata),
      req.body.datasource_id
    ]
    var groups = req.body.groups
    var reportObj = req.body

    const sql = 'INSERT INTO ' + mysql.SCHEMA + mysql.Report + ' (' + mysql.tableColumns.report + ') VALUES (?,?,?,?,?)'
    mySqlDB.query(sql, report, (err, result) => {
      if (err) {
        responseObj = response.getPostRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.affectedRows > 0) {
          var reportGroups = {
            id: result.insertId,
            groupID: groups
          }
          queryUtil.addGroupsToReport(mySqlDB, reportGroups, function () {})
          responseObj = response.getPostRespSuccess(reportObj)
          res.status(response.SUCCESS.CREATED).json(responseObj)
        } else {
          responseObj = response.getPostRespFail(response.SERVER_ERROR.INTERNAL, MSG.SERV_ERR)
          res.status(response.SERVER_ERROR.INTERNAL).json(responseObj)
        }
      }
    })
  })

  // Run a report query
  app.post(`${globals.API_URI}/reports/run`, (req, res) => {})

  /// /////////////////////////////////////////////////
  // G R O U P S
  /// /////////////////////////////////////////////////

  // Create a group
  app.post(`${globals.API_URI}/groups`, (req, res) => {
    var groupName = [req.body.name]
    var groupObj = req.body
    const sql = 'INSERT INTO ' + mysql.SCHEMA + mysql.Group + ' (' + mysql.tableColumns.group + ') VALUES (?)'
    mySqlDB.query(sql, groupName, (err, result) => {
      if (err) {
        responseObj = response.getPostRespFail(response.ERROR.NOT_ALLOWED, err.sqlMessage)
        res.status(response.ERROR.NOT_ALLOWED).json(responseObj)
      } else {
        if (result.affectedRows > 0) {
          responseObj = response.getPostRespSuccess(reportObj)
          res.status(response.SUCCESS.CREATED).json(responseObj)
        } else {
          responseObj = response.getPostRespFail(response.SERVER_ERROR.INTERNAL, MSG.SERV_ERR)
          res.status(response.SERVER_ERROR.INTERNAL).json(responseObj)
        }
      }
    })
  })
}
