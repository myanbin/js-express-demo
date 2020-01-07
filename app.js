const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

// 使用中间件，加载静态文件
app.use(express.static('public'));
// 处理 JSON 数据
app.use(express.json());

app.use('/', function (req, res, next) {
  console.log('middleware');
  next();
});

// 路由匹配是短路式的
app.get('/', function (req, res) {
  res.send('hello, world');
});

app.post('/zoos', express.json(), function (req, res) {
  const data = req.body;
  res.json(data);
});

// id 是路径变量
app.post('/users/:id', function (req, res) {
  let id = req.params.id;
  let name = req.body.name;
  res.send(id + '...' + name);
});

app.get('/download', function (req, res) {
  res.download('./api.http', 'api.txt');
});

app.get('/photo', function (req, res) {
  res.sendFile('./photo.jpg', { root: __dirname });
});

server.listen(3200, function (err) {
  if (!err) {
    console.log('express start on 3200');
  }
});