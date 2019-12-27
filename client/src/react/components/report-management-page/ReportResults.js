// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap'

// Custom file imports
import { resultsToCsvDownload } from '../../util/csv-util.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Text
const MODAL_TITLE = 'Report Results'
const BUTTON_CLOSE_TEXT = 'Cancel'
const BUTTON_CREATE_TEXT = 'Export to .CSV'

// Variants
const BUTTON_CLOSE_VARIANT = 'secondary'
const BUTTON_CREATE_VARIANT = 'primary'

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

export default function ReportResults (props) {
  /* STATE */
  // const [showingError, setShowingError]
  /* FUNCTIONS */
  // Generate results table
  const generateTable = () => (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          {props.results.resultMD
            ? props.results.resultMD.map((col, i) => (
              <th key={i}>
                {props.metaData.columnMetadata[i].colAlias !== 'null'
                  ? props.metaData.columnMetadata[i].colAlias
                  : col.colName}
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

  // Export table results to .CSV file
  const exportResults = () => {
    resultsToCsvDownload(props.results, props.metaData.columnMetadata)
  }

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{MODAL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Results table */}
          {generateTable()}
          {/* Export to .CSV */}
        </Modal.Body>
        <Modal.Footer>
          {/* {showingError
            ? <Alert variant={ALERT_ERROR_VARIANT} onClose={() => setShowingError(false)} dismissible><p>{errorMsg}</p></Alert>
          : null} */}
          <Button variant={BUTTON_CLOSE_VARIANT} onClick={props.handleClose}>{BUTTON_CLOSE_TEXT}</Button>
          <Button variant={BUTTON_CREATE_VARIANT} onClick={exportResults}>{BUTTON_CREATE_TEXT}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
