const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('./../models/User');
const UserSession = require('./../models/UserSession');

function data(success, message) {
	return {
		success: success,
		message: message
	}
};

const serverErrorMessage = {
	success: false,
	message: 'Server error'
}

router.post('/register', (req, res) => {
	const b = req.body;
	const user = new User();

	const invalidData = [];

	!b.username && invalidData.push('Enter username');
	!b.password && invalidData.push('Enter password');

	if (invalidData.length > 0) {
		return res.status(500).json(data(false, invalidData));
	}

	User.find({
		username: b.username
	}, (err, result) => {
		if (err) {
			return res.status(500).json(data(false, 'Server error'));
		} else if (result.length > 1) {
			return res.status(200).json(data(false, 'Email and username already in use'));
		} else if (result.length > 0) {
			if (result[0].username === b.username) {
				return res.status(200).json(data(false, 'Username already in use'));
			} else {
				return res.status(200).json(data(false, 'Email already in use'));
			}
		} else {
			user.username = b.username;
			user.password = user.generateHash(b.password);
			user.save(err => {
				if (err) {
					return res.status(500).json(data(false, err));
				}

				res.status(201).json(data(true, 'Successfully registered'));
			})
		}
	})
});

router.post('/login', (req, res) => {
	const b = req.body;
	const user = new User();

	const invalidData = [];

	!b.username && invalidData.push('Enter username');
	!b.password && invalidData.push('Enter password');

	if (invalidData.length > 0) {
		return res.status(500).json(data(false, invalidData));
	}


	User.find({
		username: b.username
	}, (err, result) => {
		if (err) {
			return res.status(500).json(data(false, 'Server error'));
		} else if (result.length > 0) {
			if (user.validPassword(b.password, result[0].password)) {
				const userSession = new UserSession({
					userId: result[0]._id
				});

				userSession.save((err, doc) => {
					if (err) {
						return res.status(500).json(data(false, 'Server error'))
					} else {
						return res.status(200).json({
							...data(true, 'Logged in'),
							token: doc._id,
							user: {
								username: result[0].username,
								isAdmin: result[0].isAdmin,
								data: result[0].data,
								_id: result[0]._id
							}
						});
					}
				});
			} else {
				res.statusMessage = 'Password is not correct';
				return res.status(400).end();
			}
		} else {
			return res.status(400).json(data(false, `Username doesn't exist`));
		}
	});
});

router.post('/validate', (req, res) => {
	const b = req.body;

	UserSession.find({
		_id: mongoose.Types.ObjectId(b.token),
		isDeleted: false
	}).populate({ path: 'userId', select: ['username', 'isAdmin', 'data', '_id'] })
		.exec((err, sessions) => {
			if (err) {
				return res.status(500).json({
					success: false,
					message: 'Server Error'
				});
			} else if (sessions.length != 1) {
				return res.status(400).json(data(false, `Bad verification token`));
			} else {
				const userData = {
					username: sessions[0].userId.username,
					isAdmin: sessions[0].userId.isAdmin,
					data: sessions[0].userId.data
				}
				userData.data.id = sessions[0].userId._id;

				return res.status(201).json({
					...data(true, 'Verified'),
					token: sessions[0]._id,
					user: userData
				});
			}
		});
});

router.post('/logout', (req, res) => {
	const b = req.body;

	UserSession.findOneAndUpdate({
		_id: mongoose.Types.ObjectId(b.token),
		isDeleted: false
	}, {
			$set: {
				isDeleted: true
			}
		}, null, (err, sessions) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					success: false,
					message: 'Server Error'
				});
			} else if (sessions) {
				console.log(sessions);
				return res.status(201).json({
					success: true,
					message: 'Logged out'
				});
			} else {
				console.log('bad')
				return res.status(201).json({
					success: false,
					message: 'Bad session token'
				});
			}
		});
});

router.put('/update', (req, res) => {
	const b = req.body;
	const id = b.id;
	delete b.id;

	User.findOneAndUpdate({
		_id: mongoose.Types.ObjectId(id)
	}, {
		data: b
	}, {
		new: true
	}, (err, result) => {
		if (err) {
			return res.status(500).json(serverErrorMessage)
		}

		return res.status(201).json({
			success: true,
			message: 'user data updated',
			data: result
		});
	})
});

module.exports = router;
