// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');

var express = require('express')
var app = express()

//route
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/mars', function (req, res) {
  res.send('hello Mars')
})

app.post('/', function (req, res) {
  res.send('you sent a post request')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
