module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index.jade');
	});

	// route for login form
	// route for processing the login form
	// route for signup form
	// route for processing the signup form

	// route for showing the profile page
	app.get('/profile', isLoggedIn, function(req, res) {
		console.log(req.user);
		res.render('profile.jade', {
			user: req.user // get the user out of session and pass to template
		});
	});

	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: 'user_friends,email'
	}));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	// route for logging out
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}