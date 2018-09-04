var express = require('express')
var path = require('path')
var app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/news/add', function (req, res) {
  res.render('add_news', {
    title: 'News'
  })
})


app.post('/', function (req, res) {
  res.send('you sent a post request.')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
