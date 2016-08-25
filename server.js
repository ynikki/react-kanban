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
  return res.render('index');
});

app.get('/tasks/statuses', function (req, res) {
  db.Status.findAll()
    .then(function (status) {
      return res.json(status);
  });
});

app.get('/tasks/:id', function (req, res) {
  db.Task.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (task, err) {
    if (err) {
      done(err);
    }
    res.json(task);
  });
});

app.get('/tasks', function (req, res) {
  db.Task.findAll()
    .then(function (tasks) {
      return res.json(tasks);
    });
});


app.post('/tasks', function (req, res) {
  db.Task.create({
    title: req.body.title,
    description: req.body.description,
    user_id: req.body.user_id,
    assignedTo: req.body.assignedTo,
    priority: req.body.priority,
    status_id: req.body.status_id
  })
  .then(function (task) {
    res.json(task);
  });
});

app.put('/tasks/:id', function (req, res) {
  db.Task.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (edit) {
    return edit.update({
      status_id: req.body.statusId
    });
  })
  .then(function (task) {
    res.json(task);
  });
});

app.delete('/tasks/:id', function (req, res) {
  db.Task.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (task) {
    return task.destroy();
  })
  .then(function (task) {
    return db.Task.findAll();
  })
  .then(function (tasks) {
    res.json(tasks);
  });
});

app.listen(app.get('port'), function () {
  db.sequelize.sync();
  console.log(`Server listening on port ${app.get('port')}`);
});