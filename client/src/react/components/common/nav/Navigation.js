// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// Custom file imports
import * as actions from '../../../../redux/actions'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Paths
const PATH_REPORT_CREATION = '/'
const PATH_REPORTS = '/reports'
const PATH_USERS = '/users'
const PATH_GROUPS = '/groups'

// User permissions
const PERMISSIONS = { DEFAULT_USER: 0, ADMIN: 1 }

function Navigation (props) {
  /* FUNCTIONS */
  const renderBasedOnAuth = () => {
    if (props.auth === PERMISSIONS.DEFAULT_USER) {
      return (
        <Nav variant='tabs' className='mr-auto'>
          <Nav.Link onClick={() => props.history.push(PATH_REPORTS)}> Reports </Nav.Link>
        </Nav>
      )
    } else if (props.auth === PERMISSIONS.ADMIN) {
      return (
        <Nav variant='tabs' className='mr-auto'>
          <Nav.Link onClick={() => props.history.push(PATH_REPORT_CREATION)}> Report Creation </Nav.Link>
          <Nav.Link onClick={() => props.history.push(PATH_REPORTS)}> Reports </Nav.Link>
          <Nav.Link onClick={() => props.history.push(PATH_USERS)}> Users </Nav.Link>
          <Nav.Link onClick={() => props.history.push(PATH_GROUPS)}> Groups </Nav.Link>
        </Nav>
      )
    }
  }

  const logout = () => {
    props.logoutUser()
  }

  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
      <Navbar.Brand> J-Reports </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-nav' />
      <Navbar.Collapse id='responsive-nav'>
        {renderBasedOnAuth()}
        <Nav>
          <Nav.Link>{`Logged in as ${props.user}`}</Nav.Link>
          <Nav.Link onClick={logout}> Logout </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default connect(null, actions)(withRouter(Navigation))
