// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// G L O B A L   V A R I A B L E S
/// /////////////////////////////////////////////////

// Globals
const sessionStorage = window.sessionStorage

// Keys
const SESSION_AUTH = 'sessionAuth'

/// /////////////////////////////////////////////////
// E X P O R T S   D E F I N I T I O N S
/// /////////////////////////////////////////////////

export const session = {
  /**
   * Check the session auth status.
   * -> null: user not logged in
   * -> obj: user has logged in
   */
  checkAuthStatus: () => JSON.parse(sessionStorage.getItem(SESSION_AUTH)),

  /**
   * Set the auth status of a logged
   * in user.
   */
  setAuthStatus: obj => {
    if (obj) {
      sessionStorage.setItem(SESSION_AUTH, JSON.stringify({
        id: obj.id,
        user_type_id: obj.user_type_id,
        username: obj.username
      }))
    } else {
      sessionStorage.setItem(SESSION_AUTH, null)
    }
  }
}
