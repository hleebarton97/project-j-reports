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
// G E T   E N D P O I N T S   D E F I N I T I O N
/// /////////////////////////////////////////////////

module.exports = app => {

  /// /////////////////////////////////////////////////
  // D A T A S O U R C E S
  /// /////////////////////////////////////////////////

  // Create a datasource
  app.post(`${globals.API_URI}/datasources`,
    (req, res) => {

    })

  /// /////////////////////////////////////////////////
  // U S E R S
  /// /////////////////////////////////////////////////

  // User sign in
  app.post(`${globals.API_URI}/users/login`,
    (req, res) => {

    })

  // Create a user
  app.post(`${globals.API_URI}/users`,
    (req, res) => {

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

    })

}