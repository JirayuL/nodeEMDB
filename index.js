const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const bodyParser = require('body-parser')
const Article = require('./models/article')
const Athlete = require('./models/athletes')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const config = require('./config/database')

mongoose.connect(config.database)
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

// Passport Config
require('./config/passport')(passport)
// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.get('*', function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Route
app.get('/', function (req, res) {
  Article.find({}, function (err, news) {
    Athlete.find({}, (err, athlete) => {
      if (err) {
        console.log(err)
      } else {
        res.render('index', {
          title: 'Articles',
          news: news,
          athletes_title: "Athletes",
          athletes: athlete
        });
      }
    })
  })
})

// Route Files
let articles = require('./routes/articles')
let users = require('./routes/users')
let athletes = require('./routes/athletes')
app.use('/articles', articles)
app.use('/athletes', athletes)
app.use('/users', users)


app.listen(3000, () => console.log('Example app listening on port 3000!'))
