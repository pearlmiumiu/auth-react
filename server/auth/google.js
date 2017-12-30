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


  //passport handles our successful authentication by running the verification callback, 
  //in which google's provided user profile info is included as third parameter
  function (token, refreshToken, profile, done){  //this is the verification callback
  	  /* the callback will pass back user profile information 
       each service (Facebook, Twitter, and Google)
       will pass it back a different way. 
       Passport standardizes the data that comes back in its profile object.
  	  */

    //passport handles authenticating us(consumer) with google(provider) and taks with it 3 things: 
    //our clientID(username), clientSecrete(password) and temporary token from user as result of their successful login

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
  		done(null, user); //invokes serializeUser (take an object and make it a small string)
      //if there was an error passed to done, we ill go immediately to our failureRedirect
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
//passport handles authenticating us(consumer) with google(provider) and taks with it 3 things: our clientID, clientSecrete and temporary token from user as result of their successful login
//google determines if the temporary token is associated with a successful user login and if that user gave our clientID access to their info , then google sends us that info back




//client hits this once they have verified with the provider(the callback URL)
//'http://localhost:1337/auth/google/verify'
router.get('/verify', passport.authenticate('google',{
	successRedirect:'/',  //the redirect makes a request for a new path, which runs through passport.session which runs passport.deserializeUser
	failureRedirect:'/'
}))

module.exports = router;