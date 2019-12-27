// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState } from 'react'
import { Modal, Button, Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

// Custom file imports
import * as actions from '../../../redux/actions'
import Text from '../common/Text.js'
import Textarea from '../common/Textarea.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Text
const MODAL_TITLE = 'Modify Report'
const BUTTON_CLOSE_TEXT = 'Close'
const BUTTON_UPDATE_TEXT = 'Update'
const REPORT_TITLE_LABEL = 'Report Title'
const REPORT_DESC_LABEL = 'Report Description'
const ERROR_DEFAULT_MSG = 'An unknown error occurred!'

// Variants
const BUTTON_CLOSE_VARIANT = 'secondary'
const BUTTON_ADD_VARIANT = 'primary'
const ALERT_ERROR_VARIANT = 'danger'

// API
const API_URI = 'J_Reports/rest'
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function ReportManager (props) {
  // Form input init
  let reportTitle = React.createRef()
  let reportDesc = React.createRef()

  /* STATE */
  const [canUpdate, setCanUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  /* FUNCTIONS */
  // Check if datasource info has been changed
  const checkUpdatable = () => {
    if (props.title !== reportTitle.value) {
      setCanUpdate(true)
    } else if (props.desc !== reportDesc.value) {
      setCanUpdate(true)
    } else {
      setCanUpdate(false)
    }
  }

  // Update report
  const updateReport = () => {
    setIsUpdating(true)
    // Create updated object properties
    const obj = {}
    if (props.title !== reportTitle.value) {
      obj.report_title = reportTitle.value
    } else {
      obj.report_title = props.title
    }
    if (props.desc !== reportDesc.value) {
      obj.report_desc = reportDesc.value
    } else {
      obj.report_desc = props.desc
    }
    obj.report_id = props.id
    obj.datasource_id = props.datasourceId
    obj.query_string = props.query
    obj.resultMd = props.metaData
    // PUT updated properties
    fetch(`${API_URI}/reports/${props.id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
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
          // Handle data
          props.update(data)
          setCanUpdate(false)
        }
      })
      .catch(err => {
        if (err) {
          // Handle error
          handleError(ERROR_DEFAULT_MSG)
          setIsUpdating(false)
        }
      })
  }

  // Handle datasource update & delete
  const handleError = msg => {
    setErrorMsg(msg)
    setShowingError(true)
  }

  return (
    <Modal show={props.show} onHide={props.handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{MODAL_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Report title */}
        <Text
          label={REPORT_TITLE_LABEL}
          defaultValue={props.title}
          inputRef={ref => { reportTitle = ref }}
          onChange={checkUpdatable}
        />
        {/* Report description */}
        <Textarea
          label={REPORT_DESC_LABEL}
          defaultValue={props.desc}
          inputRef={ref => { reportDesc = ref }}
          onChange={checkUpdatable}
        />
      </Modal.Body>
      <Modal.Footer>
        {showingError
          ? <Alert variant={ALERT_ERROR_VARIANT} onClose={() => setShowingError(false)} dismissible><p>{errorMsg}</p></Alert>
          : null}
        <Button variant={BUTTON_CLOSE_VARIANT} onClick={props.handleClose}>{BUTTON_CLOSE_TEXT}</Button>
        <Button
          disabled={!canUpdate}
          variant={BUTTON_ADD_VARIANT}
          onClick={updateReport}
        >
          {isUpdating
            ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
            : BUTTON_UPDATE_TEXT}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function mapStateToProps ({ reports }) {
  return { reports }
}

export default connect(mapStateToProps, actions)(ReportManager)
