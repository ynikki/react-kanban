const db = require('./models');

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');
const methodOverride = require('method-override');

app.set('port', (process.env.PORT || 8080));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', express.static(path.join(__dirname, 'views/index')));
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

app.get('/', function (req, res) {
  db.Task.findAll()
    .then(function (tasks) {
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
    }, include: [{
      model: db.Tasks,
      required: true
    }]
  })
    .then(function (task) {
      res.render('task', { task: task });
    });
});

app.listen(app.get('port'), function () {
  db.sequelize.sync();
  console.log(`Server listening on port ${app.get('port')}`);
});