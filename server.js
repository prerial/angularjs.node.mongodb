var express = require('express'),
    app = module.exports.app = express(),
    db = require('mongojs').connect('news');

app.configure(function () {
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.logger('dev'));  //tiny, short, default
    app.use(app.router);
    app.use(express.static(__dirname + '/client'));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true, showMessage: true}));
});

/* Helpers */

//To allow use ObjectId or other any type of _id
var objectId = function (_id) {
    if (_id.length === 24 && parseInt(db.ObjectId(_id).getTimestamp().toISOString().slice(0,4), 10) >= 2010) {
        return db.ObjectId(_id);
    }
    return _id;
}

//Function callback
var fn = function (req, res) {
    res.contentType('application/json');
    var fn = function (err, doc) {
    //console.log('asdasdas',req.body ,err,doc)
        if (err) {
            if (err.message) {
                doc = {error : err.message}
            } else {
                doc = {error : JSON.stringify(err)}
            }
        }
        if (typeof doc === "number" || req.params.cmd === "distinct") { doc = {ok : doc}; }
        res.send(doc);
    };
    return fn;
};

/* Routes */

// Query
app.get('/posts', function(req, res) {
  db.collection('posts').find(function(err, posts){
    if(err){ return next(err); }
    res.json(posts);
  });
});

// Read
app.get('/posts/:id', function(req, res) {
    db.collection(req.params.collection).findOne({_id:objectId(req.params.id)}, fn(req, res))
});

// Save
app.post('/posts', function(req, res, next) {
    db.collection('posts').save(req.body, {safe:true}, fn(req, res));
});

// Delete
app.del('/posts/:_id', function(req, res) {
    console.log("Delete: " +req.params._id);
    db.collection('posts').remove({_id:objectId(req.params._id)}, function(err, doc){
      db.collection('posts').find(function(err, posts){
        if(err){ return next(err); }
        res.json({data:posts});
      });
    });
});

app.listen(3000, function() {
    console.log("Listening on 3000");
});