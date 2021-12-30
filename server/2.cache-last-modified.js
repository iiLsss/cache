const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs').promises

let serve = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache') // 每次都访问服务器
  let { pathname } = url.parse(req.url)
  let absPath = path.join(__dirname, '/public', pathname)
  try {
    let statObj = await fs.stat(absPath)
    if (statObj.isDirectory()) {
      absPath = path.join(absPath, 'index.html')
      await fs.access(absPath)
    }
    let ctime = statObj.ctime.toGMTString()
    let content = await fs.readFile(absPath, 'utf-8')
    if (req.url.match(/css/)) {
      // 利用文件更新时间 判断时间是否更改 来判断缓存
      res.setHeader('Last-Modified', ctime)
      let ifModifiedSince = req.headers['if-modified-since']
      console.log('=====ifModifiedSince', ifModifiedSince)
      if (ifModifiedSince === ctime) {
        res.statusCode = 304
        return res.end()
      }
    }
    res.end(content)
  } catch (error) {
    res.end('Not found')
  }
})

serve.listen(3000, () => {
  console.log( '服务启动')
})