// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

import React from 'react'
import { Form } from 'react-bootstrap'

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

export default function Text (props) {
  return (
    <Form.Group>
      {props.label ? <Form.Label>{props.label}</Form.Label> : null}
      <Form.Control
        placeholder={props.placeholder}
        ref={props.inputRef}
        onChange={props.onChange}
        readOnly={props.readOnly}
        defaultValue={props.defaultValue}
        onClick={props.handleClick}
        type={props.type === 'password' ? 'password' : null}
      />
    </Form.Group>
  )
}
