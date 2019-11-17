const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const controllers = require('./controllers')
require('dotenv').config()
const app = express()

const {
	PORT: port = 3000,
	responseBody = {},
	responseCode = 200,
	responseErrorMessage = '',
	mongoUrl = 'mongodb://localhost/testexample'
} = process.env


mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.set('view engine', 'ejs')
app.route('/report')
.get(function (req, res) {
	controllers.getLatestHistory()
	.then((data = []) => {
		res.render('report', {
			responseCode,
			requestHistory: data,
		})	
	})
})

app.use(bodyParser.urlencoded({ extended: false }))
app.route('*')
.all(function (req, res) {
	if (req.url.match('favicon')) { return res.send('') }
	controllers.saveRequestHistory(
		req,
		{ body: JSON.parse(responseBody), status: responseCode, message: responseErrorMessage }
		)
	.then(() => {
		if (responseCode != 200) {
			res.status(responseCode).send(responseErrorMessage)
		} else {
			res.send(JSON.parse(responseBody))
		}
	})
})

app.listen(port, () =>{
	console.log(`Example app listening on port ${port}!`)
})
