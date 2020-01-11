const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('./db/mysql.js')

const app = express()

// Middleware
app.use(bodyParser.json())

// MySql Connection Object
const mySqlDB = mysql.createMySQLConnection()

// Open MySql Connection
mySqlDB.connect(err => {
  if (err) {
    throw err
  } else console.log('MySql Connected.......')
})

// API routes
require('./api/get-routes.js')(app, mySqlDB) // GET
require('./api/post-routes.js')(app, mySqlDB) // POST
require('./api/put-routes.js')(app, mySqlDB) // UPDATE
require('./api/delete-routes.js')(app, mySqlDB) // DELETE

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT)
