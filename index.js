const http = require('http')
const { v4 } = require('uuid')
const options = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

const port = process.env.PORT || 3030
const { readFiles, writeFiles } = require('./utils/utils')

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/gettodoall') {
      let getData = readFiles('data.json')
      res.writeHead(200, options)
      res.end(JSON.stringify(getData))
    }
    if (req.url === '/gettodoactive') {
      let getData = readFiles('data.json')
      res.writeHead(200, options)
      res.end(JSON.stringify(getData.filter((e) => !e.isComplate)))
    }
    if (req.url === '/gettodocompl') {
      let getData = readFiles('data.json')
      res.writeHead(200, options)
      res.end(JSON.stringify(getData.filter((e) => e.isComplate)))
    }
  }
  if (req.method === 'POST') {
    if (req.url === '/create_usr') {
      req.on('data', (chunk) => {
        const data = JSON.parse(chunk)
        const getUsers = readFiles('users.json')
        const find = getUsers.find((e) => e?.email === data.email)
        let pswd = btoa(data.password)
        if (find) {
          res.writeHead(200, options)
          res.end(JSON.stringify({ message: 'error' }))
        } else {
          const id = v4()
          getUsers.push({
            id: id,
            email: data.email,
            password: pswd,
          })
          writeFiles('users.json', getUsers)
          res.writeHead(201, options)
          console.log(id)
          res.end(
            JSON.stringify({
              message: 'ok',
              token: id,
            }),
          )
        }
      })
    }
    if (req.url === '/createtodo') {
      req.on('data', (chunk) => {
        const data = JSON.parse(chunk)
        const getData = readFiles('data.json')
        const find = getData.find((e) => e?.todo === data.value)
        if (find) {
          res.writeHead(200, options)
          res.end(
            JSON.stringify([...getData, { error: 'this to do alredy added' }]),
          )
        } else {
          getData.push({
            id: getData.length + 1,
            todo: data.value,
            isComplate: false,
          })
          writeFiles('data.json', getData)
          res.writeHead(200, options)
          res.end(JSON.stringify(data))
        }
      })
    }
  }
  if (req.method === 'POST') {
    if (req.url === '/updatetodo') {
      req.on('data', (chunk) => {
        const data = JSON.parse(chunk)
        const getData = readFiles('data.json')
        const find = getData.find((e) => e.todo === data)
        find.isComplate = find.isComplate ? false : true
        getData.splice(getData.indexOf(find), 1, find)
        writeFiles('data.json', getData)
        res.writeHead(200, options)
        res.end(JSON.stringify(getData))
      })
    }
  }
})

server.listen(port, () => {
  console.log(`http://127.0.0.1:${port} is running`)
})
