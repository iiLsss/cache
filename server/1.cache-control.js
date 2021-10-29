
const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs').promises

let server  = http.createServer(async (req, res) => {
  console.log('=====', req.url)
  let { pathname } = url.parse(req.url)
  let absPath = path.join(__dirname, '/public', pathname)
  try {
    let statObj = await fs.stat(absPath)
    if (statObj.isDirectory()) {
      absPath = path.join(absPath, 'index.html')
      await fs.access(absPath)
    }
    let content = await fs.readFile(absPath, 'utf-8')
    res.setHeader('Cache-Control', 'max-age=300')
    res.end(content)
 
  } catch (error) {
    console.log('=====', error)
    res.end('Not found')
  }
})


server.listen('3000', () => {
  console.log('=====', '服务启动')
})

let a = path.resolve(__dirname, 'public') 
console.log('=====', a)