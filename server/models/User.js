const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const schema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	dateCreated: {
		type: Date,
		default: Date.now()
	},
	activated: {
		type: Boolean,
		default: true,
	},
	banned: {
		type: Boolean,
		default: false
	},
	data: {
		type: Object,
		default: {
			profileSetUp: false,
			activity: 1
		}
	}
}, { usePushEach: true });

schema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
schema.methods.validPassword = function (password, password2) {
	return bcrypt.compareSync(password, password2);
};

module.exports = mongoose.model('User', schema);
