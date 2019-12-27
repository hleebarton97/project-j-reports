// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

// Custom file imports
import UserPermissionManager from '../user-management-page/UserPermissionManager.js'
import UserGroupManager from '../user-management-page/UserGroupManager.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Button
const BUTTON_EDIT_VARIANT = 'warning'
const BUTTON_USER_GROUP_LABEL = 'Edit Groups'
const BUTTON_USER_PERMISSION_LABEL = 'Edit Permission'

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

export default function User (props) {
  /* STATE */
  // Edit
  const [showingPermissionManagement, setShowingPermissionManagement] = useState(false)
  const [showingGroupManagement, setShowingGroupManagement] = useState(false)

  const setPermissionLabel = () => {
    if (props.data.user_type_id === 0) {
      return 'General User'
    } else if (props.data.user_type_id === 1) {
      return 'Administrator'
    }
  }

  const renderGroups = () => {
    const array = []
    let group = null
    for (group of props.data.groups) {
      array.push(group.name)
    }
    return array.join(', ')
  }

  return (
    <tr>
      <td>{props.data.id}</td>
      <td>{props.data.username}</td>
      <td>
        {renderGroups()}
        <Button size='sm' style={{ float: 'right' }} variant={BUTTON_EDIT_VARIANT} onClick={() => setShowingGroupManagement(true)}>
          {BUTTON_USER_GROUP_LABEL}
        </Button>
      </td>
      <td>
        {setPermissionLabel()}
        <Button size='sm' style={{ float: 'right' }} variant={BUTTON_EDIT_VARIANT} onClick={() => setShowingPermissionManagement(true)}>
          {BUTTON_USER_PERMISSION_LABEL}
        </Button>
      </td>
      <UserGroupManager
        show={showingGroupManagement}
        handleClose={() => setShowingGroupManagement(false)}
        data={props.data}
        update={props.update}
      />
      <UserPermissionManager
        show={showingPermissionManagement} handleClose={() => setShowingPermissionManagement(false)}
        data={props.data}
        label={setPermissionLabel()}
        update={props.update}
      />
    </tr>
  )
}
