// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Custom file imports
const globals = require('../util/globals.js')

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

/// /////////////////////////////////////////////////
// G E T   E N D P O I N T S   D E F I N I T I O N
/// /////////////////////////////////////////////////

module.exports = app => {
  /// /////////////////////////////////////////////////
  // D A T A S O U R C E S
  /// /////////////////////////////////////////////////

  // Get all datasources
  app.get(`${globals.API_URI}/datasources`,
    (req, res) => {

    })

  // Get a datasource by id
  app.get(`${globals.API_URI}/datasources/:id`,
    (req, res) => {
      // let datasourceId = req.params.id
    })

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // Get all users
  app.get(`${globals.API_URI}/users`,
    (req, res) => {

    })

  // Get a user by id
  app.get(`${globals.API_URI}/users/:id`,
    (req, res) => {
      // let userId = req.params.id
    })

  /// /////////////////////////////////////////////////
  // R E P O R T S
  /// /////////////////////////////////////////////////

  // Get all reports
  app.get(`${globals.API_URI}/reports`,
    (req, res) => {

    })

  // Get all reports by user id
  app.get(`${globals.API_URI}/reports/:id`,
    (req, res) => {
      // let reportId = req.params.id
    })

  /// /////////////////////////////////////////////////
  // G R O U P S
  /// /////////////////////////////////////////////////

  // Get all groups
  app.get(`${globals.API_URI}/groups`,
    (req, res) => {

    })

  // Get a group by id
  app.get(`${globals.API_URI}/groups/:id`,
    (req, res) => {
      // let groupId = req.params.id
    })
}
