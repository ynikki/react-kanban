const db = require('./models');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');
const methodOverride = require('method-override');

app.set('port', (process.env.PORT || 8080));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extneded: false }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/', function (req, res) {
  db.Task.findAll()
    .then(function (tasks, err) {
      if (err) {
        done(err);
      }
      return res.render('index', {Task: tasks});
    });
});

app.get('/task/new', function (req, res) {
  res.render('task');
});

app.get('/task/:id', function (req, res) {
  db.Task.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (tasks, err) {
    if (err) {
      done(err);
    }
    res.render('task', { Task: tasks });
  });
});

app.post('/task', function (req, res) {
  db.Task.create({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo,
    priority: req.body.priority
  })
  .then(function (tasks) {
    res.render('task', {Task: tasks});
  });
});

app.listen(app.get('port'), function () {
  db.sequelize.sync();
  console.log(`Server listening on port ${app.get('port')}`);
});