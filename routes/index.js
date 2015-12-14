var express = require('express');
var User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req,res,next){
  res.render('login');
});
router.get('/signup', function(req,res,next){
  res.render('signup');
});
router.get('/main',function(req,res,next){
  res.render('main');
});
router.get('/screate',function(req,res,next){
  res.render('screate');
});
router.get('/ssurvey',function(req,res,next){
  res.render('ssurvey');
});
router.get('/logout',function(req,res,next){
  delete req.session.user;
  res.redirect('/');
});
router.get('/survey',function(req,res,next){
  res.render('survey');
})
router.get('/addNewSurvey',function(req,res,next){
  res.render('addNewSurvey');
})
router.post('/login', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      res.render('error', {message: "Error", error: err});
    } else if (!user) {
      req.flash('danger', '존재하지 않는 사용자 입니다.');
      res.redirect('back');
    } else if (user.password !== req.body.password) {
      req.flash('danger', '비밀번호가 일치하지 않습니다.');
      res.redirect('back');
    } else {
      req.session.user = user;
      req.flash('success', '로그인 되었습니다.');
      res.redirect('/main');
    }
  });
});
router.post('/signup', function(req, res, next) {
  var err = validateForm(req.body, {needPassword: true});
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.flash('danger', '동일한 이메일 주소가 이미 존재합니다.');
      res.redirect('back');
    }
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
    });
    newUser.password = req.body.password;

    newUser.save(function(err) {
      if (err) {
        return next(err);
      } else {
        req.flash('success', '가입이 완료되었습니다. 로그인 해주세요.');
        res.redirect('/');
      }
    });
  });
});
module.exports = router;
