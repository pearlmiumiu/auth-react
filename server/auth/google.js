const router=require('express').Router();
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
//const { User } = require('../db/models');

passport.use(new GoogleStrategy({
	clientID:'769249803750-1al2s3b82f7om7rjo98c0j23qaa7e2or.apps.googleusercontent.com',
	clientSecret:'Gi_nqPKVtt83RPV-SCgu0Puk',
	callbackURL:'/auth/google/redirect'
},
	/* The following callback will be used when passport successfully 
     authenticates with Google (the provider) for us, 
     using our `clientId`, `clientSecret` and the temporary token from the client
     Google sends the `token`, `refreshToken` and `profile`
     passport provides the `done` function
    */



  function (token, refreshToken, profile, done){
  	  /* the callback will pass back user profile information 
       each service (Facebook, Twitter, and Google)
       will pass it back a different way. 
       Passport standardizes the data that comes back in its profile object.
  	  */
  	// const info={
  	// 	name:profile.displayName,
  	// 	email: profile.emails[0].value,
  	// 	photo:profile.photos? profile.photos[0].value: undefined
  	// };
  	// User.findOrCreate({
  	// 	where:{googleId: profile.id},
  	// 	defaults: info
  	// })
  	// .spreac(function(user, createdBool){
  	// 	done(null, user);

  	// })

  	// .catch(done);
  	console.log('----------', 'in verification callback', profile, '-----------')
  	done()

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