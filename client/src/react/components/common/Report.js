// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState } from 'react'
import { Card, Button, Form, Col, Spinner } from 'react-bootstrap'

// Custom file imports
import { parseReportQuery, getRunnableQuery } from '../../util/report-util.js'
import Text from './Text.js'
import ReportResults from '../report-management-page/ReportResults.js'
import ReportManager from '../report-management-page/ReportManager.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Style
const BOTTOM_MARGIN = 'margin bottom med'
const FLOAT_RIGHT = 'float-right'

// Variant
const EDIT_BUTTONS_VARIANT = 'secondary'

// Text
const BUTTON_RUN_TEXT = 'Run'
const BUTTON_MODIFY_TEXT = 'Modify'
const BUTTON_DELETE_TEXT = 'Delete'
const NO_INPUT = 'No input required.'
const ERROR_DEFAULT_MESSAGE = 'An unknown error occurred!'

// User permissions
const PERMISSIONS = { DEFAULT_USER: 0, ADMIN: 1 }

// API
const API_URI = 'J_Reports/rest'
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

export default function Report (props) {
  // Dynamic input refs
  const inputRefs = []
  // Modifiables
  const inputs = parseReportQuery(props.query)

  /* STATE */
  const [canRun, setCanRun] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const [showingResults, setShowingResults] = useState(false)
  const [results, setResults] = useState({})

  const [isDeleting, setIsDeleting] = useState(false)
  const [isModifying, setIsModifying] = useState(false)

  /* FUNCTIONS */
  // Generate the input based on the query
  const genInput = () => {
    if (inputs) {
      // Create input refs
      inputs.forEach(() => { inputRefs.push(React.createRef()) })
      // Generate components
      return inputs.map(
        (input, i) => (
          <Col key={i}>
            <Text
              key={i}
              placeholder={input.label}
              onChange={checkRunnable}
              inputRef={ref => { inputRefs[i] = ref }}
            />
          </Col>
        ))
    }
  }

  // Run the report
  const runReport = () => {
    setIsRunning(true)
    // Check if query has modifiables
    let runnableQuery = ''
    if (inputRefs.length > 0) {
      const values = []
      if (inputs) {
        let ref = null
        for (ref of inputRefs) {
          values.push(ref.value)
        }
      }
      // Check if query has modifiables
      runnableQuery = getRunnableQuery(props.query, values)
    } else {
      runnableQuery = props.query
    }
    // Run the report
    fetch(`${API_URI}/reports/run`, {
      method: 'POST',
      body: JSON.stringify({
        query_string: runnableQuery,
        datasource_id: props.datasourceId
      }),
      headers: API_HEADERS
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          // Handle error
          setIsRunning(false)
          props.handleError(`Server response: ${res.status}: ${res.statusText}`)
        }
      })
      .then(data => {
        // Display results
        setIsRunning(false)
        setResults(data.data)
        setShowingResults(true)
      })
      .catch(err => {
        if (err) {
          // Handle error
          setIsRunning(false)
          props.handleError(ERROR_DEFAULT_MESSAGE)
        }
      })
  }

  // Check if all required fields have input
  const checkRunnable = () => {
    let ref = null
    for (ref of inputRefs) {
      if (ref.value === '') {
        setCanRun(false)
        return
      }
    }
    setCanRun(true)
  }

  // Delete report object
  const deleteReport = () => {
    setIsDeleting(true)
    // DELETE updated properties
    fetch(`${API_URI}/reports/${props.id}`, {
      method: 'DELETE',
      headers: API_HEADERS
    })
      .then(res => {
        if (res.status === 200 || res.status === 204) {
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
          props.handleError(ERROR_DEFAULT_MESSAGE)
          setIsDeleting(false)
        }
      })
  }

  const renderHeader = () => {
    if (props.auth === PERMISSIONS.ADMIN) {
      return (
        <Card.Header>
          {props.title}
          <Button
            variant={EDIT_BUTTONS_VARIANT}
            className={FLOAT_RIGHT}
            onClick={deleteReport}
          >
            {isDeleting
              ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
              : BUTTON_DELETE_TEXT}
          </Button>
          <Button
            variant={EDIT_BUTTONS_VARIANT}
            className={FLOAT_RIGHT}
            onClick={() => setIsModifying(true)}
          >
            {BUTTON_MODIFY_TEXT}
          </Button>
        </Card.Header>
      )
    } else {
      return (
        <Card.Header>
          {props.title}
        </Card.Header>
      )
    }
  }

  return (
    <div>
      <Card className={BOTTOM_MARGIN}>
        {props.title && renderHeader()}
        <Card.Body>
          <Form>
            <Form.Row>
              <Col lg='2'>
                <Button disabled={inputs ? !canRun : false} onClick={runReport}>
                  {isRunning
                    ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                    : BUTTON_RUN_TEXT}
                </Button>
              </Col>
              {genInput()}
              {!inputs
                ? <Col>{NO_INPUT}</Col>
                : null}
            </Form.Row>
          </Form>
        </Card.Body>
        {props.desc && <Card.Footer>{props.desc}</Card.Footer>}
      </Card>
      {/* Modals */}
      <ReportResults
        show={showingResults}
        handleClose={() => setShowingResults(false)}
        results={results}
        metaData={props.metaData}
      />
      <ReportManager
        show={isModifying}
        handleClose={() => setIsModifying(false)}
        id={props.id}
        title={props.title}
        desc={props.desc}
        query={props.query}
        datasourceId={props.datasourceId}
        metaData={props.metaData}
        update={obj => props.update(obj)}
      />
    </div>
  )
}
