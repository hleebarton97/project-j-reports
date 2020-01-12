const mysql = require('../db/mysql.js')

module.exports = {
  // get all groups for a group of users
  getGroups: (mySqlDB, list, type, callback) => {
    let pending = list.length
    var joinTable, joinCol
    if (type === 0) {
      joinTable = mysql.Usergroup
      joinCol = 'user_ID'
    } else if (type === 1) {
      joinTable = mysql.Reportgroup
      joinCol = 'report_ID'
    }
    const sql = 'SELECT * FROM ' + mysql.SCHEMA + joinTable + ' WHERE ' + joinCol + ' = ?'
    for (let i = 0; i < pending; i++) {
      mySqlDB.query(
        sql,
        [list[i].id],
        (err, results) => {
          if (err) { throw err } else {
            var groups = []
            for (let j = 0; j < results.length; j++) {
              var groupsObj = {
                id: results[j].group_ID,
                name: results[j].group_Name
              }
              groups.push(groupsObj)
            }
            list[i].groups = groups
            if (--pending === 0) {
              callback(list)
            }
          }
        }
      )
    }
  },

  // get all groups for a group of users
  addGroupsToReport: (mySqlDB, report, callback) => {
    var pending = report.groupID.length
    var reportID = report.id
    var groupIDs = report.groupID

    for (let i = 0; i < pending; i++) {
      const sql = 'CALL ' + mysql.SCHEMA + 'addGroupsToReport(' + reportID + ', ' + groupIDs[i] + ');'
      mySqlDB.query(sql, err => {
        if (err) {
          /** Need error check possibly for invalid groupID */
        } else {
          if (--pending === 0) {
            callback()
          }
        }
      })
    }
  }
}
