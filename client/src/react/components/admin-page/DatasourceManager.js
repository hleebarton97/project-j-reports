// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState } from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

// Custom file imports
import * as actions from '../../../redux/actions'
import AddDatasource from './AddDatasource.js'
import Datasource from '../common/Datasource.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Modal
const MODAL_TITLE = 'Datasource Manager'

// Button
const BUTTON_CLOSE_VARIANT = 'secondary'
const BUTTON_CLOSE_TEXT = 'Close'

const BUTTON_ADD_VARIANT = 'primary'
const BUTTON_ADD_TEXT = '+ Datasource'

// Error
const ALERT_ERROR_VARIANT = 'danger'

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function DatasourceManager (props) {
  /* STATE */
  // Modal state
  const [showingAdd, setShowingAdd] = useState(false)
  // Error state
  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  /* FUNCTIONS */
  const displayDatasources = () =>
    props.datasources.data.map((datasource, i) => (
      <Datasource
        key={i}
        data={datasource}
        handleError={msg => handleError(msg)}
        update={obj => props.updateDatasource({ index: i, datasource: obj })}
        delete={() => props.removeDatasource(datasource)}
      />
    ))

  // Handle datasource update & delete
  const handleError = msg => {
    setErrorMsg(msg)
    setShowingError(true)
  }

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{MODAL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {displayDatasources()}
        </Modal.Body>
        <Modal.Footer>
          {showingError
            ? <Alert variant={ALERT_ERROR_VARIANT} onClose={() => setShowingError(false)} dismissible><p>{errorMsg}</p></Alert>
            : null}
          <Button variant={BUTTON_CLOSE_VARIANT} onClick={props.handleClose}>{BUTTON_CLOSE_TEXT}</Button>
          <Button variant={BUTTON_ADD_VARIANT} onClick={() => setShowingAdd(true)}>{BUTTON_ADD_TEXT}</Button>
        </Modal.Footer>
      </Modal>
      <AddDatasource show={showingAdd} handleClose={() => setShowingAdd(false)} add={obj => props.addDatasource(obj)} />
    </div>
  )
}

function mapStateToProps ({ datasources }) {
  return { datasources }
}

export default connect(mapStateToProps, actions)(DatasourceManager)
