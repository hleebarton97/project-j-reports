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

// Error
const ALERT_ERROR_DEFAULT_MSG = 'An unknown error occurred!'

// API URI
const API_URI = 'J_Reports/rest'

// Headers
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

export default function Group (props) {
  // Form input init
  let groupName = React.createRef()

  /* STATE */
  // Edit
  const [editState, setEditState] = useState(true)
  // Update
  const [canUpdate, setCanUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  // Delete
  const [isDeleting, setIsDeleting] = useState(false)

  /* FUNCTIONS */
  const editField = prop => {
    switch (prop) {
      case FIELD_NAME:
        setEditState(false)
        break
      default:
        break
    }
  }

  // Check if group info has been changed
  const checkUpdatable = () => {
    if (props.name !== groupName.value) {
      setCanUpdate(true)
    } else {
      setCanUpdate(false)
    }
  }

  // Update group object
  const updateGroup = () => {
    setIsUpdating(true)
    // Create updated object properties
    const obj = {}
    if (props.name !== groupName.value) {
      obj.name = groupName.value
    } else {
      obj.name = props.name
    }
    obj.id = props.id
    // PUT updated properties
    fetch(`${API_URI}/usergroups/${props.id}`, {
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

  // Delete group object
  const deleteGroup = () => {
    // DELETE updated properties
    fetch(`${API_URI}/usergroups/${props.id}`, {
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
      <InputGroup.Prepend><InputGroup.Text>{props.id}</InputGroup.Text></InputGroup.Prepend>
      {/* Name */}
      <FormControl
        readOnly={editState[0]}
        defaultValue={props.name}
        ref={ref => { groupName = ref }}
        onClick={() => editField(FIELD_NAME)}
        onChange={() => checkUpdatable()}
      />
      <InputGroup.Append>
        <Button
          onClick={updateGroup}
          disabled={!canUpdate}
          variant={BUTTON_UPDATE_VARIANT}
        >
          {isUpdating
            ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
            : BUTTON_UPDATE_TEXT}
        </Button>
        <Button
          onClick={deleteGroup}
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
