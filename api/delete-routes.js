// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
const path = require('path')

// Custom file imports
const globals = require('../util/globals.js')

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

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
      // let datasourceId = req.params.id
    })

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // Delete a user by id
  app.delete(`${globals.API_URI}/users/:id`,
    (req, res) => {
      // let userId = req.params.id
    })

  /// /////////////////////////////////////////////////
  // R E P O R T S
  /// /////////////////////////////////////////////////

  // Delete a report by id
  app.delete(`${globals.API_URI}/reports/:id`,
    (req, res) => {
      // let reportId = req.params.id
    })

  /// /////////////////////////////////////////////////
  // G R O U P S
  /// /////////////////////////////////////////////////

  // Delete a group by id
  app.delete(`${globals.API_URI}/groups/:id`,
    (req, res) => {
      // let groupId = req.params.id
    })

}