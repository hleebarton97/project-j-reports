// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React from 'react'
import { Spinner } from 'react-bootstrap'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

const CLASS_LOADING = 'overlay loading'

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function Loading (props) {
  return (
    props.show &&
      <div className={CLASS_LOADING}>
        <Spinner as='span' animation='border' size='med' role='status' aria-hidden='true' />
      </div>
  )
}

export default Loading
