const router = require('express').Router();
const HttpError = require('../utils/HttpError');
const { User } = require('../db/models');

router.put('/login', function(req, res, next){
	const {email, password} = req.body;
	
	console.log('BODY', req.body)


	User.findOne({
		where:{email, password}
	})
	.then(function(user){
		if (!user) throw HttpError(404);
		else{
			req.session.userId=user.id;
			res.end();
		}
	})
	.catch(next)
})

/*
Without going into too much detail, the following are all distinct:

setting a key to null or undefined
deleting a key
destroying a session
All achieve the result of "logging out", just varying degrees of continuing
 the client/server relationship. If we have any sensitive information associated 
 with the server session for a specific client (other than userId), then it could
  hang around for the next person (same user because same client) if we aren't careful. 
  Think about public computers and default functionality we want.

 Setting the userId to null/undefined and deleting the userId key will have the same affect 
 of continuing the client-server relationship. We can continue to collect information about 
 this relationship over time. However, if we are storing more personal information this could be 
 bad, and if it is a public computer do we really want to store information over time?

Destroying the session means that the next time this client visits it will seem like a brand new client.
 This can help prevent any issues if we are storing more personal information about the client in our session.
  And also it means we can't store information about this client over time.

*/
router.delete('/logout', function(req, res, next){
	req.logout();
	res.sendStatus(204)
	//req.session.destroy(); //--> old method
	/* Below are alternatives to the above  
  delete req.session.userId; // deletes one item on session
  req.session.userId = null;
  */
})

module.exports = router;
