var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next){
  Post.find(function(err, posts){
    if(err){ return next(err); }
    res.json(posts);
  });
});

router.get('/posts/:post', function(req, res){
  res.json(req.post);
});

router.post('/posts', function(req, res, next){
  var post = new Post(req.body);
  post.save(function(err, post){
    if(err){ return next(err); }
    res.json(post);
  });
});

router.param('post', function(req, res, next, id){
  var query = Post.findById(id);
  query.exec(function(err, post){
    if(err){ return next(err); }
    if(!post){ return next(new Error("can't find post")); }
    req.post = post;
    return next();
  });
});

router.put('/posts/:post/upvote', function(req, res, next){
  req.post.upvote(function(err, post){
    if(err){ return next(err); }
    res.json(post);
  });
});

router.delete('/posts/:post', function(req, res){
  console.log("in Delete");
  req.post.remove();
  res.json(req.post);
});

module.exports = router;
