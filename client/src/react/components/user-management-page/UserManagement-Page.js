// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState, useEffect } from 'react'
import { Container, Card, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

// Custom file imports
import * as actions from '../../../redux/actions'
import Loading from '../common/Loading.js'
import AlertError from '../common/alerts/AlertError.js'
import User from '../common/User.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Text
const HEADER_TEXT = 'User Management'

// Modals
const ALERT_ERROR_HEADER = 'Error'
const ERROR_DEFAULT_MESSAGE = 'An unknown error occurred!'

// API URI
const API_URI = 'J_Reports/rest'

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function UserManagementPage (props) {
  /* STATE */
  // Error
  const [showingError, setShowingError] = useState(false) // show error state
  const [errorMsg, setErrorMsg] = useState('') // error message state
  // Loading
  const [isLoading, setIsLoading] = useState(false) // loading state

  /* LIFECYCLE */
  // Initial requests - on mount
  useEffect(() => {
    // GET all users
    getUsers()
    // GET all groups
    getGroups()
    // eslint-disable-next-line
  }, [])

  /* FUNCTIONS */
  // API request handler - GET all users
  const getUsers = () => {
    setIsLoading(true)
    fetch(`${API_URI}/users`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          handleError(`Retrieving Users: Server response: ${res.status}: ${res.statusText}`)
        }
      })
      .then(data => {
        setIsLoading(false)
        handleUsers(data)
      })
      .catch(err => {
        if (err) {
          console.log(err)
          handleError(ERROR_DEFAULT_MESSAGE)
        }
      })
  }

  // GET all groups
  const getGroups = () => {
    fetch(`${API_URI}/usergroups`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          handleError(`Retrieving Groups: Server response: ${res.status}: ${res.statusText}`)
        }
      })
      .then(data => {
        handleGroups(data)
      })
      .catch(err => {
        if (err) {
          console.log(err)
          handleError(ERROR_DEFAULT_MESSAGE)
        }
      })
  }

  // Handle received datasource data
  const handleUsers = users => {
    // Check if users exist
    if (users.length > 0) {
      // Add users to redux store
      props.setUsers(users)
    }
  }

  // Handle received groups data
  const handleGroups = groups => {
    if (groups.length > 0) {
      props.setGroups(groups)
    }
  }

  const displayUsers = () =>
    props.users.data.map((user, i) => (
      <User
        key={i}
        data={user}
        handleError={msg => handleError(msg)}
        update={obj => props.updateUser({ index: i, user: obj })}
      />
    ))

  // Handle error
  const handleError = msg => {
    setErrorMsg(msg)
    setIsLoading(false)
    setShowingError(true)
  }

  // On error retry click
  const handleRetry = () => {
    setShowingError(false)
    getUsers()
  }

  return (
    <div>
      <Loading show={isLoading} />
      <Container className='hp xlg'>
        <Card>
          <Card.Header>{HEADER_TEXT}</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Groups</th>
                  <th>Permission</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers()}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        {/* Modals */}
        <AlertError show={showingError} handleClose={() => setShowingError(false)} handleRetry={handleRetry} heading={ALERT_ERROR_HEADER} body={errorMsg} />
      </Container>
    </div>
  )
}

function mapStateToProps ({ users }) {
  return { users }
}

export default connect(mapStateToProps, actions)(UserManagementPage)
