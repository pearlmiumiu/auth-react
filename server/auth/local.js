//const router = require('express').Router();
// const HttpError = require('../utils/HttpError');
// const { User } = require('../db/models');

// router.put('/login', function(req, res, next){
// 	const {email, password} = req.body

// 	User.findOne({
// 		where:{email, password}
// 	})
// 	.then(function(user){
// 		if (!user) throw HttpError(404);
// 		else{
// 			req.session.userId=user.id;
// 			res.end();
// 		}
// 	})
// 	.catch(next)
// })

//module.exports = router;
