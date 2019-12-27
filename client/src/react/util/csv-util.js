// Developed by
// Amphibious Pretzel Chickens

/* global Blob */

/// /////////////////////////////////////////////////
// E X P O R T S   D E F I N I T I O N S
/// /////////////////////////////////////////////////

/**
 * Convert data to CSV format and begin
 * download.
 */
export const resultsToCsvDownload =
  (data, md) => {
    const csvRows = []
    // Create headers
    csvRows.push((
      data.resultMD.map(
        (header, i) => md[i].colAlias !== 'null' ? md[i].colAlias : header.colName)
    ).join(','))
    // Create data rows
    let tempRow
    let row = null
    for (row of data.resultSet) {
      tempRow = []
      let col = null
      for (col of data.resultMD) {
        tempRow.push(`"${('' + row[col.colName]).replace(/"/g, '\\"')}"`)
      }
      csvRows.push(tempRow.join(','))
    }
    // Create csv seperated by newline
    const csv = csvRows.join('\n')
    // Download csv
    const uri = window.URL.createObjectURL(
      new Blob([csv], { type: 'text/csv' })
    )
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', uri)
    a.setAttribute('download', 'report-data.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
