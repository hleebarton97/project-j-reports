// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React from 'react'
import ReactDOM from 'react-dom'

// Redux imports
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './redux/reducers'

// Custom file imports
import App from './react/App.js'
// import './themes/flatly-bootstrap.min.css'
// import './themes/pulse-bootstrap.min.css'
import './themes/superhero-bootstrap.min.css'
import './themes/custom.css'

// Create redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
