// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React from 'react'
import ReactDOM from 'react-dom'

// Redux imports
// Redux imports
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from '../redux/reducers'

// Custom file imports
import App from '../react/App.js'

/// /////////////////////////////////////////////////
// T E S T   D E F I N I T I O N
/// /////////////////////////////////////////////////

// Create store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Provider store={store}><App /></Provider>, div)
  ReactDOM.unmountComponentAtNode(div)
})
