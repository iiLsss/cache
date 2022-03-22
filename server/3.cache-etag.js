const http = require('http')
const path = require('path')
const { URL } = require('url')
const fs = require('fs').promises
const crypto = require('crypto')

let server = http.createServer(async (req, res) => {
  let {pathname} = new URL(req.url, `http://${req.headers.host}`)
  let absPath = path.join(__dirname, '/public', pathname)
  try {
    let statObj = await fs.stat(absPath)
    if (statObj.isDirectory()) {
      absPath = path.join(absPath, 'index.html')
      await fs.access(absPath)
    }
    let content = await fs.readFile(absPath, 'utf-8')
    if (req.url.match(/css/)) {
      // 利用文件内容生成 
      let hash = crypto.createHash('md5').update(content).digest('base64')
      let ifNoneMatch = req.headers['if-none-match']
      res.setHeader('ETag', hash)
      if (ifNoneMatch === hash) {
        res.statusCode = 304
        return res.end()
      }
    }
    res.end(content)
  } catch (error) {
    console.log(error)
    res.end('Not found') 
  }
})

server.listen('3000', () => {
  console.log('服务启动')
})
