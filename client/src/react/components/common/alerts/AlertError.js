// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React from 'react'
import { Modal, Alert, Button } from 'react-bootstrap'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Alert
const ALERT_VARIANT = 'danger'

// Button
const BUTTON_CLOSE_VARIANT = 'secondary'
const BUTTON_CLOSE_TEXT = 'Close'

const BUTTON_RETRY_VARIANT = 'primary'
const BUTTON_RETRY_TEXT = 'Retry'

/// /////////////////////////G////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function AlertError (props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Alert variant={ALERT_VARIANT}>
        {props.heading ? <Alert.Heading>{props.heading}</Alert.Heading> : null}
        <p>{props.body}</p>
      </Alert>
      <Modal.Footer>
        <Button variant={BUTTON_CLOSE_VARIANT} onClick={props.handleClose}>{BUTTON_CLOSE_TEXT}</Button>
        {props.handleRetry ? <Button variant={BUTTON_RETRY_VARIANT} onClick={props.handleRetry}>{BUTTON_RETRY_TEXT}</Button> : null}
      </Modal.Footer>
    </Modal>
  )
}

export default AlertError
