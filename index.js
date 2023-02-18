const http = require('http')
const options = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

const port = process.env.PORT || 3030
const { readFiles, writeFiles } = require('./utils/utils')

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/gettodo') {
      let getData = readFiles()
      res.writeHead(200, options)
      res.end(JSON.stringify(getData))
    }
  }
})

server.listen(port, () => {
  console.log(`http://127.0.0.1:${port} is running`)
})
