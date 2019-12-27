// Developed by
// Amphibious Pretzel Chickens

/* global fetch */
/* global AbortController */

/// /////////////////////////////////////////////////
// R E Q U I R E D   /   C U S T O M   I M P O R T S
/// /////////////////////////////////////////////////

// Required imports
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

// Custom file imports
import * as actions from '../../../redux/actions'
import Text from '../common/Text.js'
import AlertError from '../common/alerts/AlertError.js'

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Styles
const ROW_CENTER = 'justify-content-md-center'
const HEADER_PADDING = 'hp lg'
const MARGIN_TOP = 'margin top xlg'

// Text
const CARD_HEADER_TEXT = 'Signup'
const PAGE_HEADER_TEXT = 'J-Reports'

const USERNAME_LABEL = 'Username'
const USERNAME_PLACEHOLDER = 'Enter a username'

const PASSWORD_TYPE = 'password'
const PASSWORD_LABEL = 'Password'
const PASSWORD_PLACEHOLDER = 'Enter a password'

const PASSWORD_CONFIRM_TYPE = 'password'
const PASSWORD_CONFIRM_LABEL = 'Confirm Password'
const PASSWORD_CONFIRM_PLACEHOLDER = 'Confirm your password'

const REGISTER_BUTTON_TEXT = 'Register'

const ALERT_ERROR_HEADER = 'Error'
const ERROR_DEFAULT_MESSAGE = 'An unknown error occurred!'

// Paths
const PATH_DEFAULT = '/'

// API URI
const API_URI = 'J_Reports/rest'
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function RegistrationPage (props) {
  // Form input init
  let username = React.createRef()
  let password = React.createRef()
  let confirmPassword = React.createRef()

  // Handle asynchronous
  const abortController = new AbortController()

  /* STATE */
  const [canRegister, setCanRegister] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    return () => abortController.abort()
    // eslint-disable-next-line
  }, [])

  /* FUNCTIONS */
  // Check if register button should be enabled
  const checkCanRegister = () => {
    if (username.value && password.value && confirmPassword.value) {
      if (password.value === confirmPassword.value) {
        setCanRegister(true)
        return
      }
    }
    setCanRegister(false)
  }

  // Register the user in database
  const register = e => {
    if (e) { e.preventDefault() }
    setIsLoading(true)
    const usernameValue = username.value
    const passwordValue = password.value
    // Make register request
    fetch(`${API_URI}/users`, {
      method: 'POST',
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
        user_type_id: 0
      }),
      headers: API_HEADERS,
      signal: abortController.signal
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          handleError(`Server response: ${res.status}: ${res.statusText}`)
        }
      })
      .then(data => {
        props.history.push(PATH_DEFAULT)
      })
      .catch(err => {
        if (err) {
          console.log(err)
          handleError(ERROR_DEFAULT_MESSAGE)
        }
      })
  }

  // Handle error
  const handleError = msg => {
    setErrorMsg(msg)
    setIsLoading(false)
    setShowingError(true)
  }

  // On error retry
  const handleRetry = () => {
    setShowingError(false)
    register()
  }

  return (
    <div>
      <Container>
        <Row className={ROW_CENTER}>
          <Col lg='2' />
          <Col>
            <h1 className={HEADER_PADDING}>{PAGE_HEADER_TEXT}</h1>
            <Card>
              <Card.Header>{CARD_HEADER_TEXT}</Card.Header>
              <Card.Body>
                {/* Username */}
                <Form onSubmit={register}>
                  <Text
                    label={USERNAME_LABEL}
                    placeholder={USERNAME_PLACEHOLDER}
                    inputRef={ref => { username = ref }}
                    onChange={checkCanRegister}
                  />
                  {/* Password */}
                  <Text
                    label={PASSWORD_LABEL}
                    placeholder={PASSWORD_PLACEHOLDER}
                    type={PASSWORD_TYPE}
                    inputRef={ref => { password = ref }}
                    onChange={checkCanRegister}
                  />
                  {/* Password Confirmation */}
                  <Form.Group>
                    <Form.Label>{PASSWORD_CONFIRM_LABEL}</Form.Label>
                    <Form.Control
                      placeholder={PASSWORD_CONFIRM_PLACEHOLDER}
                      type={PASSWORD_CONFIRM_TYPE}
                      ref={ref => { confirmPassword = ref }}
                      onChange={checkCanRegister}
                      isInvalid={!canRegister}
                    />
                    <Form.Control.Feedback type='invalid'>
                      Passwords do not match!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type='submit'
                    className={MARGIN_TOP}
                    disabled={!canRegister}
                    onClick={register}
                    block
                  >
                    {isLoading
                      ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                      : REGISTER_BUTTON_TEXT}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg='2' />
        </Row>
      </Container>
      {/* Modals */}
      <AlertError
        show={showingError}
        handleClose={() => setShowingError(false)}
        handleRetry={handleRetry}
        heading={ALERT_ERROR_HEADER}
        body={errorMsg}
      />
    </div>
  )
}

export default connect(null, actions)(RegistrationPage)
