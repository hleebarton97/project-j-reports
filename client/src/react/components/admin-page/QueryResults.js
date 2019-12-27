// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState, useEffect } from 'react'
import { Modal, Button, Alert, Spinner, Table, Form, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Custom file imports
import * as actions from '../../../redux/actions'
import Text from '../common/Text.js'
import Textarea from '../common/Textarea.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Modal
const MODAL_TITLE = 'Query Results'

// Labels
const FORM_REPORT_TITLE_LABEL = 'Report Title'
const FORM_REPORT_DESC_LABEL = 'Report Description'

const REPORT_DESC_ROWS = '4'

// Button
const BUTTON_CLOSE_VARIANT = 'secondary'
const BUTTON_CLOSE_TEXT = 'Cancel'

const BUTTON_CREATE_VARIANT = 'primary'
const BUTTON_CREATE_TEXT = 'Create Report'

// Error
const ALERT_ERROR_VARIANT = 'danger'
const ALERT_ERROR_DEFAULT_MSG = 'An unknown error occurred!'

// Paths
const PATH_REPORTS = '/reports'

// API URI
const API_URI = 'J_Reports/rest'

// POST headers
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function QueryResults (props) {
  // Form input init
  let reportTitle = React.createRef()
  let reportDesc = React.createRef()
  const colRefs = [] // Column alias input
  const groupRefs = [] // Group selection input

  /* STATE */
  // Group assignment state
  const [groupSelection, setGroupSelection] = useState([])
  // Report creation state
  const [canCreate, setCanCreate] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  // Error state
  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    console.log(groupSelection)
  }, [groupSelection])

  /* FUNCTIONS */
  // Create updated resultMD
  const updateResultMD = () => {
    const copyMD = [...props.results.resultMD]
    copyMD.forEach((col, i) => {
      if (col.colName !== colRefs[i].value) {
        col.colAlias = colRefs[i].value
      }
    })
    return copyMD
  }

  // Handle report creation
  const postReport = () => {
    setIsCreating(true)
    setShowingError(false)
    // Update meta data based on Admin changes
    const newResultMD = updateResultMD()
    // Create report
    fetch(`${API_URI}/reports/create`, {
      method: 'POST',
      body: JSON.stringify({
        datasource_id: props.datasource,
        query_string: props.query,
        report_title: reportTitle.value,
        report_desc: reportDesc.value,
        resultMD: {
          columnMetadata: newResultMD
        },
        groups: groupSelection
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
        setIsCreating(false)
        // Redirect to report managment
        props.history.push(PATH_REPORTS)
      })
      .catch(err => {
        if (err) {
          handleError(ALERT_ERROR_DEFAULT_MSG)
        }
      })
  }

  // Handle datasource update & delete
  const handleError = msg => {
    setIsCreating(false)
    setErrorMsg(msg)
    setShowingError(true)
  }

  // Check required input fields for report creation
  const checkRequiredFields = () => {
    if (reportTitle.value) {
      if (reportTitle.value.length) {
        setCanCreate(true)
        return
      }
    }
    setCanCreate(false)
  }

  const generateTable = () => {
    if (props.results.resultMD) {
      props.results.resultMD.forEach(() => { colRefs.push(React.createRef()) })
    }
    return (
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            {props.results.resultMD
              ? props.results.resultMD.map((col, i) => (
                <th key={i}>
                  <FormControl
                    defaultValue={col.colName}
                    ref={ref => { colRefs[i] = ref }}
                  />
                </th>
              ))
              : null}
          </tr>
        </thead>
        <tbody>
          {props.results.resultSet
            ? props.results.resultSet.map((row, i) => (
              <tr key={i}>
                {props.results.resultMD.map((col, j) => (
                  <td key={i + j}>{row[col.colName]}</td>
                ))}
              </tr>
            ))
            : null}
        </tbody>
      </Table>
    )
  }

  // Render group checkbox options
  const renderGroups = () => {
    // Create input refs
    props.groups.data.forEach(() => {
      groupRefs.push(React.createRef())
    })
    // Generate checkboxes
    return props.groups.data.map((group, i) => (
      <Form.Check
        inline
        key={i}
        id={group.id}
        label={group.name}
        name={group.name}
        onChange={() => groupSelected(i)}
        ref={ref => { groupRefs[i] = ref }}
      />
    )
    )
  }

  // Check if user can be updated
  const groupSelected = index => {
    const ref = groupRefs[index]
    let tempUpdated = [...groupSelection]
    if (ref.checked) { // Add to
      tempUpdated.push(Number(ref.id))
    } else { // Remove from
      tempUpdated = tempUpdated.filter(id => {
        return id !== Number(ref.id)
      })
    }
    setGroupSelection(tempUpdated)
  }

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{MODAL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`${props.query}`}</p>
          {generateTable()}
          {/* Report Info Form */}
          <Text
            label={FORM_REPORT_TITLE_LABEL}
            inputRef={ref => { reportTitle = ref }}
            onChange={checkRequiredFields}
          />
          <Textarea
            label={FORM_REPORT_DESC_LABEL}
            inputRef={ref => { reportDesc = ref }}
            rows={REPORT_DESC_ROWS}
          />
          Assign Groups
          <div>
            {renderGroups()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {showingError
            ? <Alert variant={ALERT_ERROR_VARIANT} onClose={() => setShowingError(false)} dismissible><p>{errorMsg}</p></Alert>
            : null}
          <Button variant={BUTTON_CLOSE_VARIANT} onClick={props.handleClose}>{BUTTON_CLOSE_TEXT}</Button>
          <Button disabled={!canCreate} variant={BUTTON_CREATE_VARIANT} onClick={postReport}>
            {isCreating
              ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
              : BUTTON_CREATE_TEXT}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

function mapStateToProps ({ reports, groups }) {
  return { reports, groups }
}

export default connect(mapStateToProps, actions)(withRouter(QueryResults))
