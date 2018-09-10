var express = require('express')
var path = require('path')
var app = express()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb');
var db = mongoose.connection;
db.on('open', function () { console.log('connected to MongoDB.') });
db.on('error', console.error.bind(console, 'connection error:'));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const Article = require('./models/article')

//Route
app.get('/', function (req, res) {
  Article.find({}, function (err, news) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        news: news
      });
    }
  })
})

app.get('/articles/add', function (req, res) {
  res.render('add_news', {
    title: 'Add Article'
  })
})

// Submit POST Route
app.post('/articles/add', function (req, res) {
  let article = new Article()
  article.title = req.body.title
  article.author = req.body.author
  article.body = req.body.body
  article.save(function (err) {
    if (err) {
      console.log(err)
      return
    } else {
      res.redirect('/')
    }
  })
});

// Update Submit POST Route
app.post('/articles/edit/:id', function (req, res) {
  let article = {}
  article.title = req.body.title
  article.author = req.body.author
  article.body = req.body.body

  let query = {_id:req.params.id}

  Article.update(query, article, function (err) {
    if (err) {
      console.log(err)
      return
    } else {
      res.redirect('/')
    }
  })
});

// Get single articel
app.get('/article/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    res.render('article', {
      article: article
    })
  })
})

// Load Edit Form
app.get('/article/edit/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    res.render('edit_article', {
      title: 'Edit Article',
      article: article
    })
  })
})


app.post('/', function (req, res) {
  res.send('you sent a post request.')
})

app.delete('/article/:id', function(req, res){
  let query = {_id:req.params.id}

  Article.remove(query, function(err){
    if(err){
      console.log(err)
    }
    res.send('Success')
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
