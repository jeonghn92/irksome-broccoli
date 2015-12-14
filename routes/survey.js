var express = require('express'),
    Post = require('../models/Survey');
var router = express.Router();

/* GET posts listing. */
router.get('/', function(req, res, next) {
  Post.find({}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('ssurvey', {posts: docs});
  });
});

router.get('/screate', function(req, res, next) {
  res.render('screate');
});

router.post('/', function(req, res, next) {
  var post = new Post({
    title: req.body.title,
    email: req.body.email,
    content: req.body.content
  });

  post.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/survey');
  });
});

router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    Comment.find({post: post.id}, function(err, comments) {
      if (err) {
        return next(err);
      }
      res.render('posts/show', {post: post, comments: comments});
    });
  });
});

router.post('/:id/comments', function(req, res, next) {
  var comment = new Comment({
    post: req.params.id,
    email: req.body.email,
    content: req.body.content
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    Post.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts/' + req.params.id);
    });
  });
});

module.exports = router;
