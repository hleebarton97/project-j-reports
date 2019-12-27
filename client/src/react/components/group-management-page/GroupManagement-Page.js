// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

// Custom file imports
import * as actions from '../../../redux/actions'
import Loading from '../common/Loading.js'
import AlertError from '../common/alerts/AlertError.js'
import Group from '../common/Group.js'
import AddGroup from './AddGroup.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Styles
const ROW_CENTER = 'justify-content-md-center'

const ALERT_ERROR_HEADER = 'Error'
const ERROR_DEFAULT_MESSAGE = 'An unknown error occurred!'

const BUTTON_GROUP_MARGIN = 'margin bottom lg'

const API_URI = '/J_Reports/rest'

const BUTTON_GROUP_LABEL = 'Add Group'

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function GroupManagementPage (props) {
  /* STATE */
  // Group
  const [showingAdd, setShowingAdd] = useState(false)
  // Loading
  const [isLoading, setIsLoading] = useState(false)
  // Error
  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  /* LIFECYCLE */
  // Get all reports
  useEffect(() => {
    getGroups()
  }, [])

  /* FUNCTIONS */
  // GET all groups
  const getGroups = () => {
    setIsLoading(true)
    fetch(`${API_URI}/usergroups`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          handleError(`Server response: ${res.status}: ${res.statusText}`)
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

  // Handle received groups data
  const handleGroups = groups => {
    setIsLoading(false)
    if (groups.length > 0) {
      props.setGroups(groups)
    } else {
      setShowingAdd(true)
    }
  }

  const displayGroups = () =>
    props.groups.data.map((group, i) => (
      <Group
        key={i}
        id={group.id}
        name={group.name}
        handleError={handleError}
        update={obj => props.updateGroup({ index: i, group: obj })}
        delete={() => props.removeGroup(group)}
      />
    ))

  // Handle error
  const handleError = msg => {
    setErrorMsg(msg)
    setIsLoading(false)
    setShowingError(true)
  }

  // On error retry
  const handleRetry = () => {
    setShowingError(false)
    getGroups()
  }

  return (
    <div>
      <Loading show={isLoading} />
      <Container>
        <h1 className='hp lg'> All Groups </h1>
        <Row className={ROW_CENTER}>
          <Col lg='2'>
            {props.groups.data.length > 0
              ? null
              : (isLoading
                ? null
                : <p> No groups to display. </p>)}
          </Col>
          <Col>
            {props.groups.data.length > 0
              ? displayGroups()
              : null}
          </Col>
          <Col lg='2'>
            <Button className={BUTTON_GROUP_MARGIN} disabled={isLoading} onClick={() => setShowingAdd(true)}>
              {BUTTON_GROUP_LABEL}
            </Button>
          </Col>
        </Row>
      </Container>
      {/* Modals */}
      <AlertError show={showingError} handleClose={() => setShowingError(false)} handleRetry={handleRetry} heading={ALERT_ERROR_HEADER} body={errorMsg} />
      <AddGroup show={showingAdd} handleClose={() => setShowingAdd(false)} add={obj => props.addGroup(obj)} />
    </div>
  )
}

function mapStateToProps ({ groups }) {
  return { groups }
}

export default connect(mapStateToProps, actions)(GroupManagementPage)
