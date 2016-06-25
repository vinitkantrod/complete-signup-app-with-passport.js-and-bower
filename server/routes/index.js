var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index.ejs');
  // res.render('index', { title: 'Express' });
});

router.get('/profile', isLoggedIn, function(req, res){
	res.render('profile.ejs', {
		user: req.user
	});
});

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};

router.get('/logout', function(req, res){
	console.log('processing for logout');
	req.logout();
	res.redirect('/');
});	

router.get('/login', function(req, res){
	res.render('login.ejs', {
		message: req.flash('LoginMessage')
	});
})

router.post('/login', passport.authenticate('local-login',{
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/signup', function(req, res){
	res.render('signup.ejs', {
		message: req.flash('signupMessage')
	});
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));

module.exports = router;
