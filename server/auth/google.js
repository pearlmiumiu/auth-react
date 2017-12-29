const router=require('express').Router();
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');

passport.use(new GoogleStrategy({
  //with our credentials , passport sends the client to google oauth login page with our clientid and callback URL described in the strategy creation
	clientID:'154667440624-pua37t6118d0jl437qaq6vbq2nnd62vt.apps.googleusercontent.com',
	clientSecret:'Y7ep99k7QoNhcyR_ILItNPly',
	callbackURL:'auth/google/verify'
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
  	const info={
  		name:profile.displayName,
  		email: profile.emails[0].value,
  		photo:profile.photos? profile.photos[0].value: undefined
  	};
  	User.findOrCreate({
  		where:{googleId: profile.id},
  		defaults: info
  	})
  	.spread(function(user, createdBool){
  		done(null, user);
  	})
  	.catch(done);
  	// console.log('----------', 'in verification callback', profile, '-----------')
  	// done()

  })


)


//client request to login through google=='http://localhost:1337/auth/google'
router.get('/', passport.authenticate('google', {scope:'email'})) 
//the req passed through passport.initialize which starts our passport app
//it also passed through passport.session which hooks into the session we have set up with express-session

//client hits this once they have verified with the provider(the callback URL)
//'http://localhost:1337/auth/google/verify'
router.get('/verify', passport.authenticate('google',{
	successRedirect:'/',
	failureRedirect:'/'
}))

module.exports = router;