const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose');
const db = mongoose.connection;
const bodyParser = require('body-parser')
const Article = require('./models/article')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')

mongoose.connect('mongodb://localhost/nodekb');
db.on('open', function () { console.log('connected to MongoDB.') });
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

// Express Message Middleware
app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.message = require('express-messages')(req, res)
  next()
})

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

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

// Route Files
let articles = require('./routes/articles')
app.use('/articles', articles)


app.listen(3000, () => console.log('Example app listening on port 3000!'))
