const mysql = require('mysql')

function createConnection () {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'j_reports'
  })
}

module.exports = {
  SCHEMA: ' j_reports.',
  User: 'user',
  Datasource: 'db_connection',
  Report: 'report',
  Group: 'group'
}

module.exports.createConnection = createConnection
