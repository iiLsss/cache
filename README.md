# cache

首先我们先看下请求静态资源的请求头信息，每次页面刷新都会向服务端发送请求。

![请求头](./static/1.server.png)

```js
let server = http.createServer(async (req, res) => {
  console.log('=====', req.url) // /index.css 每次刷新都会进行打印
  //...
})
```
> 对一些实时性不高的静态文件进行缓存，防止重复请求服务器，造成服务器压力、渲染页面变慢等问题。


## 强制缓存&协商缓存

- 强制缓存：用户发送的请求，直接从用户客户端缓存读取，不发送到服务端，无与服务端交互
- 协商缓存：用户发送的请求，发送到服务端，由服务端根据参数判断是否让客户端从客户端缓存读取。协商缓存无法减少请求开销，但可减少返回的正文大小。



### 强制缓存

> 强制缓存就是不像服务端发请求

- [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control) 新版本
- [Expires](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires) 新版本


### 协商缓存

