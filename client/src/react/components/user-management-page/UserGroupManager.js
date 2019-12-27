// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState, useEffect } from 'react'
import { Modal, Button, Spinner, Alert, Form } from 'react-bootstrap'
import { connect } from 'react-redux'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Modal
const MODAL_TITLE = 'Edit User Groups'

// Button
const BUTTON_CLOSE_VARIANT = 'secondary'
const BUTTON_CLOSE_TEXT = 'Cancel'

const BUTTON_SAVE_VARIANT = 'primary'
const BUTTON_SAVE_TEXT = 'Save'

// Error
const ALERT_ERROR_VARIANT = 'danger'
const ALERT_ERROR_DEFAULT_MSG = 'An unknown error occurred!'

// API URI
const API_URI = 'J_Reports/rest'

// Headers
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function UserGroupManager (props) {
  // Dynamic input refs
  const inputRefs = []

  /* STATE */
  // Modified groups state
  const [updatedGroups, setUpdatedGroups] = useState([...props.data.groups])
  // Creation state
  const [isUpdating, setIsUpdating] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)
  // Error state
  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    console.log(updatedGroups)
  }, [updatedGroups])

  /* FUNCTIONS */
  // Pass input for datasource creation
  const handleUpdate = () => {
    setIsUpdating(true)
    setShowingError(false)
    updateUser()
  }

  // Update user object
  const updateUser = () => {
    setIsUpdating(true)
    // Create updated object properties
    // PUT updated properties
    fetch(`${API_URI}/users/${props.data.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        groups: [...updatedGroups]
      }),
      headers: API_HEADERS
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          // Handle error
          handleError(`Server response: ${res.status}: ${res.statusText}`)
          setIsUpdating(false)
        }
      })
      .then(data => {
        setIsUpdating(false)
        if (data) {
          // Handle user
          props.update(data)
          setCanUpdate(false)
        }
      })
      .catch(err => {
        if (err) {
          // Handle error
          handleError(ALERT_ERROR_DEFAULT_MSG)
          setIsUpdating(false)
        }
      })
  }

  // Handle user update error
  const handleError = msg => {
    setIsUpdating(false)
    setErrorMsg(msg)
    setShowingError(true)
  }

  // Render group checkbox options
  const renderGroups = () => {
    // Create input refs
    props.groups.data.forEach(() => {
      inputRefs.push(React.createRef())
    })
    // Generate checkboxes
    return props.groups.data.map((group, i) => {
      let checked = false
      let userGroup = null
      for (userGroup of props.data.groups) {
        if (Number(group.id) === Number(userGroup.id)) {
          checked = true
          break
        }
      }
      return (
        <Form.Check
          inline
          key={i}
          defaultChecked={checked}
          id={group.id}
          label={group.name}
          name={group.name}
          onChange={() => checkUpdatable(i)}
          ref={ref => { inputRefs[i] = ref }}
        />
      )
    })
  }

  // Check if user can be updated
  const checkUpdatable = index => {
    const ref = inputRefs[index]
    let tempUpdated = [...updatedGroups]
    if (ref.checked) { // Add to
      tempUpdated.push({
        id: Number(ref.id),
        name: ref.name
      })
    } else { // Remove from
      tempUpdated = tempUpdated.filter(oldGroup => {
        return Number(oldGroup.id) !== Number(ref.id)
      })
    }
    setUpdatedGroups(tempUpdated)
    // Check if can update
    if (props.data.groups.length !== tempUpdated.length) {
      setCanUpdate(true)
      return
    } else { // Same length, but different selection
      let found = false
      let groupUpdate = null
      let userGroup = null
      for (groupUpdate of tempUpdated) {
        for (userGroup of props.data.groups) {
          if (Number(groupUpdate.id) === Number(userGroup.id)) {
            found = true
            break
          }
        }
        // Check if changed
        if (!found) {
          setCanUpdate(true)
          return
        }
      }
    }
    setCanUpdate(false)
  }

  return (
    <Modal show={props.show} onHide={props.handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{MODAL_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderGroups()}
      </Modal.Body>
      <Modal.Footer>
        {showingError
          ? <Alert variant={ALERT_ERROR_VARIANT} onClose={() => setShowingError(false)} dismissible><p>{errorMsg}</p></Alert>
          : null}
        <Button variant={BUTTON_CLOSE_VARIANT} onClick={props.handleClose}>{BUTTON_CLOSE_TEXT}</Button>
        <Button
          disabled={!canUpdate}
          variant={BUTTON_SAVE_VARIANT}
          onClick={() => handleUpdate()}
        >
          {isUpdating
            ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
            : BUTTON_SAVE_TEXT}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function mapStateToProps ({ groups }) {
  return { groups }
}

export default connect(mapStateToProps, null)(UserGroupManager)
