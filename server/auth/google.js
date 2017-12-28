const router=require('express').Router();
const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');

passport.use(new GoogleStrategy({
	clientID:'769249803750-1al2s3b82f7om7rjo98c0j23qaa7e2or.apps.googleusercontent.com',
	clientSecret:'Gi_nqPKVtt83RPV-SCgu0Puk',
	callbackURL:'/auth/google/redirect'
},
  function (token, refreshToken, profile, done){
  	const info={
  		name:profile.displayName,
  		email: profile.emails[0].value,
  		photo:profile.photos? profile.photos[0].value: undefined
  	};
  	User.findOrCreate({
  		where:{googleId: profile.id},
  		defaults: info
  	})
  	.spreac(function(user, createdBool){
  		done(null, user);
  	})

  	//console.log('----------', 'in verification callback', profile, '----------');
  	.catch(done);
  })


)


//client request to login through google=='http://localhost:1337/auth/google'
router.get('/', passport.authenticate('google', {scope:'email'}))

//client hits this once they have verified with the provider(the callback URL)
//'http://localhost:1337/auth/google/verify'
router.get('/verify', passport.authenticate('google',{
	successRedirect:'/',
	failureRedirect:'/'
}))

module.exports = router;