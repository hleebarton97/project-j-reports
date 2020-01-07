const mysql = require('mysql')
const keys = require('../config/keys.js')

function createMySQLConnection () {
  return mysql.createConnection(keys.dbCreds)
  /**
    * you need a key file in the config folder with the following code
    * pertaining to your mysql db
    *
    * ....example...........
    * var dbCreds = {
      host: '<your mysql server name>',
      user: '<your mysql username>',
      password: '<your mymsql password>',
      database: '<your mysql schema name>'
   }
      module.exports.dbCreds = dbCreds
    */
}

module.exports = {
  SCHEMA: ' j_reports.',
  User: 'user',
  Datasource: 'db_connection',
  Report: 'report',
  Group: 'group',
  Usergroup: 'user_group',
  Reportgroup: 'report_group'
}

var inserts = {
  datasource: 'Name, URL, Username, Password',
  user: 'Username, Password, Password_salt, User_type_id',
  report: 'Title, Query, Description, Metadata, connection_ID',
  group: 'Name'
}

module.exports.inserts = inserts
module.exports.createMySQLConnection = createMySQLConnection
