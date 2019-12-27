// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// Custom file imports
import * as actions from '../redux/actions'
import { session } from './util/auth-util.js'
import Navigation from './components/common/nav/Navigation.js'
import LoginPage from './components/login-page/Login-Page.js'
import AdminPage from './components/admin-page/Admin-Page.js'
import ReportManagementPage from './components/report-management-page/ReportManagement-Page.js'
import UserManagementPage from './components/user-management-page/UserManagement-Page.js'
import GroupManagementPage from './components/group-management-page/GroupManagement-Page.js'
import RegistrationPage from './components/registration-page/Registration-Page.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Paths
const PATH_DEFAULT = '/'
const PATH_REGISTRATION = '/signup'
const PATH_REPORT_MANAGEMENT = '/reports'
const PATH_USER_MANAGEMENT = '/users'
const PATH_GROUP_MANAGEMENT = '/groups'

// User permissions
const PERMISSIONS = { DEFAULT_USER: 0, ADMIN: 1 }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function App ({ auth, loginUser }) {
  /* STATE */
  useEffect(() => {
    // Check if the user is already logged in
    const authStatus = session.checkAuthStatus()
    if (authStatus) {
      loginUser(authStatus)
    }
    // eslint-disable-next-line
  }, [])

  /* FUNCTIONS */
  const renderBasedOnAuth = () => {
    if (auth.data) {
      // Render admin view
      if (auth.data.user_type_id === PERMISSIONS.ADMIN) {
        return (
          <Switch>
            <Route exact path={PATH_REPORT_MANAGEMENT} component={ReportManagementPage} />
            <Route exact path={PATH_USER_MANAGEMENT} component={UserManagementPage} />
            <Route exact path={PATH_GROUP_MANAGEMENT} component={GroupManagementPage} />
            <Route path={PATH_DEFAULT} component={AdminPage} />
          </Switch>
        )
      } else if (auth.data.user_type_id === PERMISSIONS.DEFAULT_USER) {
        return (
          <Switch>
            <Route path={PATH_DEFAULT} component={ReportManagementPage} />
          </Switch>
        )
      }
    }
    return (
      <Switch>
        <Route exact path={PATH_REGISTRATION} component={RegistrationPage} />
        <Route path={PATH_DEFAULT} component={LoginPage} />
      </Switch>
    )
  }

  return (
    <Router>
      {auth.data ? <Navigation auth={auth.data.user_type_id} user={auth.data.username} /> : null}
      {renderBasedOnAuth()}
    </Router>
  )
}

function mapStateToProps ({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, actions)(App)
