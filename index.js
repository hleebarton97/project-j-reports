const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Middleware
app.use(bodyParser.json())

// API routes
require('./api/get-routes.js')(app)     // GET
require('./api/post-routes.js')(app)    // POST
require('./api/put-routes.js')(app)     // UPDATE
require('./api/delete-routes.js')(app)  // DELETE

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT)
