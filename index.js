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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const Article = require('./models/article');

//Route
app.get('/', function (req, res) {
  Article.find({}, function (err, news) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Home',
        news: news
      });
    }
  });
});

// app.get('/', function (req, res) {
  //   res.render('index')
  // })
  
app.get('/', function (req, res) {
  let news = [{
      id: 1,
      title: 'news1',
      body: 'this is news 1.'
    },
    {
      id: 2,
      title: 'news2',
      body: 'this is news 2.'
    },
    {
      id: 3,
      title: 'news3',
      body: 'this is news 3.'
    }
  ];
  res.render('index', {
    title: 'Home',
    news: news
  })
})


// app.get('/news/add', function (req, res) {
//   res.render('add_news', {
//     title: 'News'
//   })
// })
app.get('/news/add', function (req, res) {
  res.render('add_news', {
    title: 'Add news'
  })
})

app.post('/news/add', function (req, res) {
  let news = new Article()
  news.title = req.body.title
  news.body = req.body.body
  news.save(function (err) {
    if (err) {
      console.log(err)
      return
    } else {
      res.redirect('/')
    }
  })
});


app.post('/', function (req, res) {
  res.send('you sent a post request.')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
