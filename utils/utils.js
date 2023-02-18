const fs = require('fs')
const path = require('path')

const readFiles = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data', 'data.json'), 'utf-8'),
  )
}

const writeFiles = (data) => {
  return fs.writeFileSync(
    path.join(__dirname, '../data', 'data.json'),
    JSON.stringify(data, null, 4),
  )
}

module.exports = {
  readFiles,
  writeFiles,
}
