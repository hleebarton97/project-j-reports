// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState, useEffect } from 'react'
import { Form, Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

// Custom file imports
import * as actions from '../../../redux/actions'
import Textarea from '../common/Textarea.js'
import AlertError from '../common/alerts/AlertError.js'
import DatasourceManager from './DatasourceManager.js'
import QueryResults from './QueryResults.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Text
const HEADER_TEXT = 'Report Creation'

// Form.Controls
const DROPDOWN_AS = 'select'
const TEXTAREA_ROWS = '4'

// Form.Labels
const DROPDOWN_LABEL = 'Select a Datasource'
const BUTTON_DATASOURCE_LABEL = 'Manage Datasources'
const TEXTAREA_LABEL = 'Enter Query'
const BUTTON_QUERY_LABEL = 'Test Query'

// Modals
const ALERT_ERROR_HEADER = 'Error'
const ERROR_DEFAULT_MESSAGE = 'An unknown error occurred!'

// Custom css
const BUTTON_DATASOURCE_MARGIN = 'margin bottom lg'

// API URI
const API_URI = 'J_Reports/rest'
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function AdminPage (props) {
  // Dropdown & Query input
  let inputDatasource = React.createRef()
  let inputQuery = React.createRef()

  /* STATE */
  // Datasource
  const [showingManagement, setShowingManagement] = useState(false) // datasource management state
  // Query
  const [showingQueryResults, setShowingQueryResults] = useState(false) // query test results modal state
  const [query, setQuery] = useState('') // query string being tested
  const [queryResults, setQueryResults] = useState({}) // results from query test
  const [datasourceId, setDatasourceId] = useState(null) // selected datasource when testing query
  // Error
  const [showingError, setShowingError] = useState(false) // show error state
  const [errorMsg, setErrorMsg] = useState('') // error message state
  // Loading
  const [isLoading, setIsLoading] = useState(false) // loading state
  // Testing
  const [canTest, setCanTest] = useState(false) // testing query state
  const [isTesting, setIsTesting] = useState(false) // testing state

  /* LIFECYCLE */
  // Initial requests - on mount
  useEffect(() => {
    // GET all datasources
    getDatasources()
    // GET all groups
    getGroups()
    // eslint-disable-next-line
  }, [])

  /* FUNCTIONS */
  // API request handler - GET all datasources
  const getDatasources = () => {
    setIsLoading(true)
    fetch(`${API_URI}/datasources`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          handleError(`Retrieving Datasources: Server response: ${res.status}: ${res.statusText}`)
        }
      })
      .then(data => {
        handleDatasources(data)
      })
      .catch(err => {
        if (err) {
          handleError(ERROR_DEFAULT_MESSAGE)
        }
      })
  }

  // GET all groups
  const getGroups = () => {
    fetch(`${API_URI}/usergroups`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          handleError(`Retrieving Groups: Server response: ${res.status}: ${res.statusText}`)
        }
      })
      .then(data => {
        handleGroups(data)
      })
      .catch(err => {
        if (err) {
          console.log(err)
          handleError(ERROR_DEFAULT_MESSAGE)
        }
      })
  }

  // Handle received datasource data
  const handleDatasources = datasources => {
    setIsLoading(false)
    // Check if datasources exist
    if (datasources.length > 0) {
      // Add datasources to redux store
      props.setDatasources(datasources)
    } else {
      // Open datasource management modal
      setShowingManagement(true)
    }
  }

  // Handle received groups data
  const handleGroups = groups => {
    if (groups.length > 0) {
      props.setGroups(groups)
    }
  }

  // Handle query test results
  const handleQueryResults = (data, query) => {
    console.log(data)
    setIsTesting(false)
    setQuery(query)
    setQueryResults(data)
    setShowingQueryResults(true)
  }

  // Get report template
  const getReportTemplate = () => {
    const index = Number(inputDatasource.value)
    const query = inputQuery.value
    setIsTesting(true)
    setDatasourceId(props.datasources.data[index].id)
    fetch(`${API_URI}/reports/template`, {
      method: 'POST',
      body: JSON.stringify({
        query_string: query,
        datasource_id: props.datasources.data[index].id
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
        handleQueryResults(data.data, query)
      })
      .catch(err => {
        if (err) {
          handleError(ERROR_DEFAULT_MESSAGE)
        }
      })
  }

  // Create the dropdown options
  const createDatasourceOptions = () =>
    props.datasources.data.map((datasource, i) => (
      <option key={datasource.id} value={i}>{datasource.name}</option>
    ))

  // Handle datasource select
  const handleDatasourceSelection = () => {
    if (inputDatasource.value) {
      checkRequiredFields()
    }
  }

  // Check required input fields are filled
  const checkRequiredFields = () => {
    if (inputDatasource.value && inputQuery.value) {
      setCanTest(true)
    } else {
      setCanTest(false)
    }
  }

  // Handle error
  const handleError = msg => {
    setErrorMsg(msg)
    setIsLoading(false)
    setIsTesting(false)
    setShowingError(true)
  }

  // On error retry
  const handleRetry = () => {
    setShowingError(false)
    getDatasources()
  }

  return (
    <Container>
      <h1 className='hp lg'> {HEADER_TEXT} </h1>
      <Row>
        <Col>
          <Form>
            {/* Datasource dropdown */}
            <Form.Group>
              <Form.Label> {DROPDOWN_LABEL} </Form.Label>
              <Form.Control
                as={DROPDOWN_AS}
                ref={ref => { inputDatasource = ref }}
                onChange={handleDatasourceSelection}
              >
                <option value='' />
                {createDatasourceOptions()}
              </Form.Control>
            </Form.Group>
            <Button className={BUTTON_DATASOURCE_MARGIN} disabled={isLoading} onClick={() => setShowingManagement(true)}>
              {isLoading
                ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                : BUTTON_DATASOURCE_LABEL}
            </Button>
            {/* Query input */}
            <Textarea label={TEXTAREA_LABEL} onChange={checkRequiredFields} inputRef={ref => { inputQuery = ref }} rows={TEXTAREA_ROWS} />
            <Button disabled={!canTest} onClick={getReportTemplate}>
              {isTesting
                ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                : BUTTON_QUERY_LABEL}
            </Button>
          </Form>
        </Col>
        <Col />
        <Col />
      </Row>
      {/* Modals */}
      <AlertError show={showingError} handleClose={() => setShowingError(false)} handleRetry={handleRetry} heading={ALERT_ERROR_HEADER} body={errorMsg} />
      <DatasourceManager show={showingManagement} handleClose={() => setShowingManagement(false)} />
      <QueryResults
        show={showingQueryResults}
        handleClose={() => setShowingQueryResults(false)}
        query={query}
        results={queryResults}
        datasource={datasourceId}
      />
    </Container>
  )
}

function mapStateToProps ({ datasources }) {
  return { datasources }
}

export default connect(mapStateToProps, actions)(AdminPage)
