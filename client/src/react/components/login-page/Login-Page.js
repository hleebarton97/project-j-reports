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
const CARD_HEADER_TEXT = 'Login'
const PAGE_HEADER_TEXT = 'J-Reports'

const USERNAME_LABEL = 'Username'
const USERNAME_PLACEHOLDER = 'Enter a username'

const PASSWORD_TYPE = 'password'
const PASSWORD_LABEL = 'Password'
const PASSWORD_PLACEHOLDER = 'Enter a password'

const LOGIN_BUTTON_TEXT = 'Login'

const ALERT_ERROR_HEADER = 'Error'
const ERROR_DEFAULT_MESSAGE = 'An unknown error occurred!'

// Paths
const PATH_REGISTRATION = '/signup'

// API URI
const API_URI = 'J_Reports/rest'
const API_HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' }

/// /////////////////////////////////////////////////
// C O M P O N E N T   D E F I N I T I O N
/// /////////////////////////////////////////////////

function LoginPage (props) {
  // Form input init
  let username = React.createRef()
  let password = React.createRef()

  // Handle asynchronous
  const abortController = new AbortController()

  /* STATE */
  const [canLogin, setCanLogin] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [showingError, setShowingError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    return () => abortController.abort()
    // eslint-disable-next-line
  }, [])

  /* FUNCTIONS */
  // Check if login button should be enabled
  const checkCanLogin = () => {
    if (username.value && password.value) {
      setCanLogin(true)
      return
    }
    setCanLogin(false)
  }

  // Log the user in
  const login = e => {
    if (e) { e.preventDefault() }
    setIsLoading(true)
    const usernameValue = username.value
    const passwordValue = password.value
    // Make login request
    fetch(`${API_URI}/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue
      }),
      headers: API_HEADERS,
      signal: abortController.signal
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          if (res.status === 400) {
            handleError('Incorrect username or password!')
          } else {
            handleError(`Server response: ${res.status}: ${res.statusText}`)
          }
        }
      })
      .then(data => {
        if (data) {
          const obj = {
            id: data.id,
            user_type_id: data.user_type_id,
            username: usernameValue
          }
          setIsLoading(false)
          props.loginUser(obj)
        }
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
    login()
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
                <Form onSubmit={login}>
                  <Text
                    label={USERNAME_LABEL}
                    placeholder={USERNAME_PLACEHOLDER}
                    inputRef={ref => { username = ref }}
                    onChange={checkCanLogin}
                  />
                  {/* Password */}
                  <Text
                    label={PASSWORD_LABEL}
                    placeholder={PASSWORD_PLACEHOLDER}
                    type={PASSWORD_TYPE}
                    inputRef={ref => { password = ref }}
                    onChange={checkCanLogin}
                  />
                  <Button
                    type='submit'
                    className={MARGIN_TOP}
                    disabled={!canLogin}
                    onClick={login}
                    block
                  >
                    {isLoading
                      ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                      : LOGIN_BUTTON_TEXT}
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Card.Link href='' onClick={() => props.history.push(PATH_REGISTRATION)}> Signup </Card.Link>
              </Card.Footer>
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

export default connect(null, actions)(LoginPage)
