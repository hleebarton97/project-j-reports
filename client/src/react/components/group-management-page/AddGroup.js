// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState } from 'react'
import { Modal, Button, Spinner, Alert } from 'react-bootstrap'

// Custom file imports
import Text from '../common/Text.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Modal
const MODAL_TITLE = 'Create Group'

// Button
const BUTTON_CLOSE_VARIANT = 'secondary'
const BUTTON_CLOSE_TEXT = 'Cancel'

const BUTTON_ADD_VARIANT = 'primary'
const BUTTON_ADD_TEXT = 'Create'

// Error
const ALERT_ERROR_VARIANT = 'danger'
const ALERT_ERROR_DEFAULT_MSG = 'An unknown error occurred!'

// Labels
const FORM_NAME_LABEL = 'Group Name'
const FORM_NAME_PLACEHOLDER = 'Enter group name'

// API URI
const API_URI = 'J_Reports/rest'

// POST headers
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function AddGroup (props) {
  // Form input init
  let groupName = React.createRef()

  // Creation state
  const [canCreate, setCanCreate] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  // Error state
  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  /* FUNCTIONS */
  // Pass input for group creation
  const handleAdd = () => {
    setIsAdding(true)
    setShowingError(false)
    postGroup()
  }

  // Add group to database
  const postGroup = () => {
    fetch(`${API_URI}/usergroups`, {
      method: 'POST',
      body: JSON.stringify({
        name: groupName.value
      }),
      headers: API_HEADERS
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          handleError(`Server response: ${res.status}: ${res.statusText}`)
        }
      })
      .then(data => {
        setIsAdding(false)
        if (data) {
          props.add(data)
          props.handleClose()
        }
      })
      .catch(err => {
        if (err) {
          handleError(ALERT_ERROR_DEFAULT_MSG)
        }
      })
  }

  // Handle group creation error
  const handleError = msg => {
    setIsAdding(false)
    setErrorMsg(msg)
    setShowingError(true)
  }

  // Check required input fields are filled
  const checkRequiredFields = () => {
    if (groupName.value) {
      if (groupName.value.length) {
        setCanCreate(true)
        return
      }
    }
    setCanCreate(false)
  }

  return (
    <Modal show={props.show} onHide={props.handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{MODAL_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Group Name */}
        <Text
          label={FORM_NAME_LABEL}
          placeholder={FORM_NAME_PLACEHOLDER}
          inputRef={ref => { groupName = ref }}
          onChange={checkRequiredFields}
        />
      </Modal.Body>
      <Modal.Footer>
        {showingError
          ? <Alert variant={ALERT_ERROR_VARIANT} onClose={() => setShowingError(false)} dismissible><p>{errorMsg}</p></Alert>
          : null}
        <Button variant={BUTTON_CLOSE_VARIANT} onClick={props.handleClose}>{BUTTON_CLOSE_TEXT}</Button>
        <Button
          disabled={!canCreate || isAdding}
          variant={BUTTON_ADD_VARIANT}
          onClick={handleAdd}
        >
          {isAdding
            ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
            : BUTTON_ADD_TEXT}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddGroup
