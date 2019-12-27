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
const MODAL_TITLE = 'Create Datasource'

// Button
const BUTTON_CLOSE_VARIANT = 'secondary'
const BUTTON_CLOSE_TEXT = 'Cancel'

const BUTTON_ADD_VARIANT = 'primary'
const BUTTON_ADD_TEXT = 'Create'

// Error
const ALERT_ERROR_VARIANT = 'danger'
const ALERT_ERROR_DEFAULT_MSG = 'An unknown error occurred!'

// Labels
const FORM_NAME_LABEL = 'Datasource Name'
const FORM_NAME_PLACEHOLDER = 'Enter datasource name'

const FORM_CONNECTION_LABEL = 'Connection String'
const FORM_CONNECTION_PLACEHOLDER = 'http://localhost:5000/'

const FORM_USERNAME_LABEL = 'Username'
const FORM_USERNAME_PLACEHOLDER = 'Enter datasource username'

const FORM_PASSWORD_LABEL = 'Password'
const FORM_PASSWORD_PLACEHOLDER = 'Enter datasource password'

// API URI
const API_URI = 'J_Reports/rest'

// POST headers
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function AddDatasource (props) {
  // Form input init
  let datasourceName = React.createRef()
  let datasourceConnection = React.createRef()
  let datasourceUsername = React.createRef()
  let datasourcePassword = React.createRef()

  // Creation state
  const [canCreate, setCanCreate] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  // Error state
  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  /* FUNCTIONS */
  // Pass input for datasource creation
  const handleAdd = () => {
    setIsAdding(true)
    setShowingError(false)
    postDatasource()
  }

  // Add datasource to database
  const postDatasource = () => {
    fetch(`${API_URI}/datasources`, {
      method: 'POST',
      body: JSON.stringify({
        name: datasourceName.value,
        connection_string: datasourceConnection.value,
        username: datasourceUsername.value,
        password: datasourcePassword.value
      }),
      headers: API_HEADERS
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
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

  // Handle datasource creation error
  const handleError = msg => {
    setIsAdding(false)
    setErrorMsg(msg)
    setShowingError(true)
  }

  // Check required input fields are filled
  const checkRequiredFields = () => {
    if (datasourceName.value && datasourceConnection.value) {
      if (datasourceName.value.length && datasourceConnection.value.length) {
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
        {/* Datasource Name */}
        <Text
          label={FORM_NAME_LABEL}
          placeholder={FORM_NAME_PLACEHOLDER}
          inputRef={ref => { datasourceName = ref }}
          onChange={checkRequiredFields}
        />
        {/* Connection String */}
        <Text
          label={FORM_CONNECTION_LABEL}
          placeholder={FORM_CONNECTION_PLACEHOLDER}
          inputRef={ref => { datasourceConnection = ref }}
          onChange={checkRequiredFields}
        />
        {/* Username */}
        <Text
          label={FORM_USERNAME_LABEL}
          placeholder={FORM_USERNAME_PLACEHOLDER}
          inputRef={ref => { datasourceUsername = ref }}
        />
        {/* Password */}
        <Text
          label={FORM_PASSWORD_LABEL}
          placeholder={FORM_PASSWORD_PLACEHOLDER}
          inputRef={ref => { datasourcePassword = ref }}
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
            ? <Spinner as='span' animation='border' size='med' role='status' aria-hidden='true' />
            : BUTTON_ADD_TEXT}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddDatasource
