// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

import React, { useState } from 'react'
import { InputGroup, FormControl, Button, Spinner } from 'react-bootstrap'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Variants
const BUTTON_UPDATE_VARIANT = 'secondary'
const BUTTON_DELETE_VARIANT = 'secondary'

// Text
const BUTTON_UPDATE_TEXT = 'Update'
const BUTTON_DELETE_TEXT = 'Delete'

// Field types
const FIELD_NAME = 'name'
const FIELD_CONNECTION = 'connection_string'
const FIELD_USERNAME = 'username'
const FIELD_PASSWORD = 'password'

// Error
const ALERT_ERROR_DEFAULT_MSG = 'An unknown error occurred!'

// API URI
const API_URI = 'J_Reports/rest'

// Headers
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

export default function Datasource (props) {
  // Form input init
  let datasourceName = React.createRef()
  let datasourceConnection = React.createRef()
  let datasourceUsername = React.createRef()
  let datasourcePassword = React.createRef()

  /* STATE */
  // Edit
  const [editState, setEditState] = useState([true, true, true, true])
  // Update
  const [canUpdate, setCanUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  // Delete
  const [isDeleting, setIsDeleting] = useState(false)

  /* FUNCTIONS */
  const editField = prop => {
    switch (prop) {
      case FIELD_NAME:
        setEditState([false, true, true, true])
        break
      case FIELD_CONNECTION:
        setEditState([true, false, true, true])
        break
      case FIELD_USERNAME:
        setEditState([true, true, false, true])
        break
      case FIELD_PASSWORD:
        setEditState([true, true, true, false])
        break
      default:
        break
    }
  }

  // Check if datasource info has been changed
  const checkUpdatable = () => {
    if (props.data.name !== datasourceName.value) {
      setCanUpdate(true)
    } else if (props.data.connection_string !== datasourceConnection.value) {
      setCanUpdate(true)
    } else if (props.data.username !== datasourceUsername.value) {
      setCanUpdate(true)
    } else if (props.data.password !== datasourcePassword.value) {
      setCanUpdate(true)
    } else {
      setCanUpdate(false)
    }
  }

  // Update datasource object
  const updateDatasource = () => {
    setIsUpdating(true)
    // Create updated object properties
    const obj = {}
    if (props.data.name !== datasourceName.value) {
      obj.name = datasourceName.value
    } else {
      obj.name = props.data.name
    }
    if (props.data.connection_string !== datasourceConnection.value) {
      obj.connection_string = datasourceConnection.value
    } else {
      obj.connection_string = props.data.connection_string
    }
    if (props.data.username !== datasourceUsername.value) {
      obj.username = datasourceUsername.value
    } else {
      obj.username = props.data.username
    }
    if (props.data.password !== datasourcePassword.value) {
      obj.password = datasourcePassword.value
    } else {
      obj.password = props.data.password
    }
    obj.id = props.data.id
    // PUT updated properties
    fetch(`${API_URI}/datasources/${props.data.id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: API_HEADERS
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          // Handle error
          props.handleError(`Server response: ${res.status}: ${res.statusText}`)
          setIsUpdating(false)
        }
      })
      .then(data => {
        setIsUpdating(false)
        if (data) {
          // Handle data
          props.update(data)
          setCanUpdate(false)
        }
      })
      .catch(err => {
        if (err) {
          // Handle error
          props.handleError(ALERT_ERROR_DEFAULT_MSG)
          setIsUpdating(false)
        }
      })
  }

  // Delete datasource object
  const deleteDatasource = () => {
    // DELETE updated properties
    fetch(`${API_URI}/datasources/${props.data.id}`, {
      method: 'DELETE',
      headers: API_HEADERS
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          // Handle error
          props.handleError(`Server response: ${res.status}: ${res.statusText}`)
          setIsDeleting(false)
        }
      })
      .then(data => {
        setIsDeleting(false)
        if (data) {
          // Handle data
          props.delete()
        }
      })
      .catch(err => {
        if (err) {
          // Handle error
          props.handleError(ALERT_ERROR_DEFAULT_MSG)
          setIsDeleting(false)
        }
      })
  }

  return (
    <InputGroup>
      {/* ID */}
      <InputGroup.Prepend><InputGroup.Text>{props.data.id}</InputGroup.Text></InputGroup.Prepend>
      {/* Name */}
      <FormControl
        readOnly={editState[0]}
        defaultValue={props.data.name}
        ref={ref => { datasourceName = ref }}
        onClick={() => editField(FIELD_NAME)}
        onChange={() => checkUpdatable()}
      />
      {/* Connection String */}
      <FormControl
        readOnly={editState[1]}
        defaultValue={props.data.connection_string}
        ref={ref => { datasourceConnection = ref }}
        onClick={() => editField(FIELD_CONNECTION)}
        onChange={() => checkUpdatable()}
      />
      {/* Username */}
      <FormControl
        readOnly={editState[2]}
        defaultValue={props.data.username}
        ref={ref => { datasourceUsername = ref }}
        onClick={() => editField(FIELD_USERNAME)}
        onChange={() => checkUpdatable()}
      />
      {/* Password */}
      <FormControl
        readOnly={editState[3]}
        defaultValue={props.data.password}
        ref={ref => { datasourcePassword = ref }}
        onClick={() => editField(FIELD_PASSWORD)}
        onChange={() => checkUpdatable()}
      />
      <InputGroup.Append>
        <Button
          onClick={updateDatasource}
          disabled={!canUpdate}
          variant={BUTTON_UPDATE_VARIANT}
        >
          {isUpdating
            ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
            : BUTTON_UPDATE_TEXT}
        </Button>
        <Button
          onClick={deleteDatasource}
          variant={BUTTON_DELETE_VARIANT}
        >
          {isDeleting
            ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
            : BUTTON_DELETE_TEXT}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  )
}
