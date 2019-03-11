const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	timeStamp: {
		type: Date,
		default: Date.now()
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, { usePushEach: true });

module.exports = mongoose.model('UserSession', schema);
