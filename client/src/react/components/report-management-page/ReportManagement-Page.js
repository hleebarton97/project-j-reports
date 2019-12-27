// Developed by
// Amphibious Pretzel Chickens

/* global fetch */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

// Custom file imports
import * as actions from '../../../redux/actions'
import Loading from '../common/Loading.js'
import AlertError from '../common/alerts/AlertError.js'
import Report from '../common/Report.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Styles
const ROW_CENTER = 'justify-content-md-center'

const ALERT_ERROR_HEADER = 'Error'
const ERROR_DEFAULT_MESSAGE = 'An unknown error occurred!'

const API_URI = 'J_Reports/rest'

// User permissions
const PERMISSIONS = { DEFAULT_USER: 0, ADMIN: 1 }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function ReportManagementPage (props) {
  /* STATE */
  // Loading
  const [isLoading, setIsLoading] = useState(false)
  // Error
  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  /* LIFECYCLE */
  // Get all reports
  useEffect(() => {
    // All groups
    if (props.auth.data.user_type_id === PERMISSIONS.DEFAULT_USER) {
      getUserReports()
    } else {
      getReports()
    }
    // eslint-disable-next-line
  }, [])

  /* FUNCTIONS */
  // GET all reports
  const getReports = () => {
    setIsLoading(true)
    fetch(`${API_URI}/reports`)
      .then(res => {
        if (res.status === 200 || res.status === 204) {
          return res.json()
        } else {
          handleError(`Server response: ${res.status}: ${res.statusText}`)
        }
      })
      .then(data => {
        console.log(data)
        handleReports(data)
      })
      .catch(err => {
        if (err) {
          console.log(err)
          handleError(ERROR_DEFAULT_MESSAGE)
        }
      })
  }

  // Get reports based on user groups
  const getUserReports = () => {
    setIsLoading(true)
    fetch(`${API_URI}/reports/${props.auth.data.id}`)
      .then(res => {
        if (res.status === 200 || res.status === 204) {
          return res.json()
        } else {
          handleError(`Server response: ${res.status}: ${res.statusText}`)
        }
      })
      .then(data => {
        console.log(data)
        handleReports(data)
      })
      .catch(err => {
        if (err) {
          console.log(err)
          handleError(ERROR_DEFAULT_MESSAGE)
        }
      })
  }

  // Handle received reports data
  const handleReports = reports => {
    setIsLoading(false)
    if (reports.length > 0) {
      props.setReports(reports)
    }
  }

  const displayReports = () =>
    props.reports.data.map((report, i) => (
      <Report
        key={i}
        auth={props.auth.data.user_type_id}
        id={report.report_id}
        title={report.report_title}
        desc={report.report_desc}
        query={report.query_string}
        datasourceId={report.datasource_id}
        metaData={report.resultMD}
        handleError={handleError}
        update={obj => props.updateReport({ index: i, report: obj })}
        delete={() => props.removeReport(report)}
      />
    ))

  // Handle error
  const handleError = msg => {
    setErrorMsg(msg)
    setIsLoading(false)
    setShowingError(true)
  }

  // On error retry
  const handleRetry = () => {
    setShowingError(false)
    getReports()
  }

  return (
    <div>
      <Loading show={isLoading} />
      <Container>
        <h1 className='hp lg'> All Reports </h1>
        <Row className={ROW_CENTER}>
          <Col lg='2'>
            {props.reports.data.length > 0
              ? null
              : (isLoading
                ? null
                : <p> No reports to display. </p>)}
          </Col>
          <Col>
            {props.reports.data.length > 0
              ? displayReports()
              : null}
          </Col>
          <Col lg='2' />
        </Row>
      </Container>
      {/* Modals */}
      <AlertError show={showingError} handleClose={() => setShowingError(false)} handleRetry={handleRetry} heading={ALERT_ERROR_HEADER} body={errorMsg} />
    </div>
  )
}

function mapStateToProps ({ reports, auth }) {
  return { reports, auth }
}

export default connect(mapStateToProps, actions)(ReportManagementPage)
