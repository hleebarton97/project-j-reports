// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState } from 'react'
import { Modal, Button, Spinner, Alert, Form } from 'react-bootstrap'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Modal
const MODAL_TITLE = 'Edit User Permissions'

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

function UserPermissionManager (props) {
  // Form input init
  let userPermission = React.createRef()

  // Creation state
  const [isUpdating, setIsUpdating] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)
  // Error state
  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  /* FUNCTIONS */
  const checkUpdatable = () => {
    if (userPermission.value !== '') {
      if (props.data.user_type_id !== Number(userPermission.value)) {
        setCanUpdate(true)
        return
      }
    }
    setCanUpdate(false)
  }

  const handleUpdate = () => {
    setIsUpdating(true)
    setShowingError(false)
    updateUser()
  }

  // Update user object
  const updateUser = () => {
    setIsUpdating(true)
    // PUT updated properties
    fetch(`${API_URI}/users/${props.data.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        user_type_id: Number(userPermission.value)
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
          console.log(data)
          props.update(data)
          setCanUpdate(false)
        }
      })
      .catch(err => {
        if (err) {
          // Handle error
          console.log(err)
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
  // Labels no change!!!
  return (
    <Modal show={props.show} onHide={props.handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{MODAL_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId='formPermission'>
          <Form.Label>Selected User: {props.data.username}</Form.Label>
          <Form.Control
            as='select'
            ref={ref => { userPermission = ref }}
            onChange={() => checkUpdatable()}
          >
            <option value=''>Select a permission type</option>
            <option value='0'>General User</option>
            {/* <option value='1'>Report Creator</option> */}
            <option value='1'>Administrator</option>
          </Form.Control>
        </Form.Group>
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
            ? <Spinner as='span' animation='border' size='med' role='status' aria-hidden='true' />
            : BUTTON_SAVE_TEXT}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserPermissionManager
