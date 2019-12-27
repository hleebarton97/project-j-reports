// Developed by
// Amphibious Pretzel Chickens

/// /////////////////////////////////////////////////
// E X P O R T S   D E F I N I T I O N S
/// /////////////////////////////////////////////////

/**
 * Check if the provided query contains modifiable input by
 * the user.
 * Example Query:
 * SELECT * FROM Table WHERE Price < {10;NUM;Product Price};
 */
export const parseReportQuery =
  query => {
    // Split by '{'
    const splitByOpen = query.split('{')
    splitByOpen.shift() // Remove everything before first '{'
    // Check if modifiables exist
    if (splitByOpen.length > 0) {
      const splitByClose = [] // Split by '}'
      let str = null
      for (str of splitByOpen) {
        const temp = str.split('}')
        splitByClose.push(temp.shift())
      }
      // Create array of modifiable's data
      const modifiables = []
      str = null
      for (str of splitByClose) {
        const vals = str.split(';')
        modifiables.push({
          placeholder: vals[0],
          type: vals[1],
          label: vals[2]
        })
      }
      return modifiables // Give back data
    } else {
      return null // Not modifiable
    }
  }

/**
 * Generate a runnable query by replacing the modifiables
 * with user specified values
 * Example Query:
 * SELECT * FROM Table WHERE Price < {10;NUM;Product Price};
 * Example Runnable:
 * SELECT * FROM Table WHERE Price < 10;
 */
export const getRunnableQuery =
  (query, values) => {
    let runnableQuery = query
    let value = null
    for (value of values) {
      runnableQuery =
        runnableQuery.substring(0, runnableQuery.indexOf('{')) +
        value +
        runnableQuery.substring(runnableQuery.indexOf('}') + 1)
    }
    return runnableQuery
  }
