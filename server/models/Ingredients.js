const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		default: 'default.png'
	},

}, { usePushEach: true });

module.exports = mongoose.model('Ingredient', schema);
