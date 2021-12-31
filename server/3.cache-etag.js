const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs').promises

let server = http.createServer(async (req, res) => {
  let { pathname } = url.parse(req.url)
  let absPath = path.join(__dirname, '/public', pathname)
  try {
    let statObj = await fs.stat(absPath)
    if (statObj.isDirectory()) {
      absPath = path.join(absPath, 'index.html')
    }
  } catch (error) {
    
  }
})

server.listen('3000', () => {
  console.log('服务启动')
})
