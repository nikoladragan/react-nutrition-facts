const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// const cron = require('./cron');
const config = require('./config/database');

// // routes
const userRoute = require('./routes/user');
// const mealRoute = require('./routes/meal');
// const ingredientRoute = require('./routes/ingredient');


const port = config.port;
const app = express();

app.listen(port);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.database, { useNewUrlParser: true, useFindAndModify: false }).then(
	() => {
		console.log('connected to mongo');

		//cron.cron();
		app.use('/user', userRoute);
		// app.use('/meal', mealRoute);
		// app.use('/ingredient', ingredientRoute);
	},
	err => {
		console.log(`can't connect to db`, err);
	}
)
