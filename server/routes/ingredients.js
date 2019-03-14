const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Ingredient = require('./../models/Ingredient');

const serverErrorMessage = {
	success: false,
	message: 'Server error'
}


router.post('/', (req, res) => {
	const b = req.body;

	const ingredient = new Ingredient({
		name: b.name
	});

	ingredient.save((err, result) => {
		if (err) {
			return res.status(500).json(serverErrorMessage)
		}

		return res.status(201).json({
			success: true,
			message: 'Ingredient saved',
			data: result
		});
	})
});
