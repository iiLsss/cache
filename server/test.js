const http = require('http')
const {URL} = require('url')

let server = http.createServer((req, res) => {
  let {pathname} = new URL(req.url, `http://${req.headers.host}`);
  console.log('=====', pathname)
  res.end('wadwa')
})

server.listen(3000)