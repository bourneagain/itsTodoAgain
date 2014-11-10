(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  //var db = mongojs('meanTodo', ['todos']);
 // var db = mongojs('mongodb://test:test@ds049170.mongolab.com:49170/mytestdb');
   var db = mongojs('mongodb://test:test@ds049170.mongolab.com:49170/mytestdb', ['todos']);
    //var db = require('mongojs').connect('test:test@ds049170.mongolab.com:49170/mytestdb');
    //var contacts = db.collection('meanTODO'); //get a handle on the contacts collection within the database

    db.on('error', function() {
  console.log('we had an error.');
});

db.once('open',function callback(){
    console.log('libAuth db opened-value is PASS   PASSS  PASSS ') ;
});
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/todos', function(req, res) {
    db.todos.find(function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/todos', function(req, res) {
    db.todos.insert(req.body, function(err, data) {
      res.json(data);
    });

  });

  router.put('/api/todos', function(req, res) {

    db.todos.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isCompleted: req.body.isCompleted,
      todo: req.body.todo
    }, {}, function(err, data) {
      res.json(data);
    });

  });

  router.delete('/api/todos/:_id', function(req, res) {
    db.todos.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });

  });

  module.exports = router;

}());
