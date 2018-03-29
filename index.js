'use strict';

const exec = require('child_process').exec;
const express = require('express');

const app = express();

app.get('/', function (req, res) {
	let temperature = getTemp();
	let humidity = getHumidity();
	res.status(200).send({temperature, humidity}); //get current temp from python code
});

app.get('/temp', function (req, res) {
	let temperature = getTemp();
	res.status(200).send({temperature}); //get current temp from python code
});

app.get('/hum', function (req, res) {
	let humidity = getHumidity();
	res.status(200).send({humidity}); //get current temp from python code
});

app.get('/setTarget', function (req, res) {
	let target = req.query.targetTemp;
	//TODO: set target temp
	console.log(`set the target temp to ${target}`);
	res.status(200).send({targetTemp: target});
});

app.post('/off', function (req, res) {

});

app.post('/heat', function (req, res) {

});

function getTemp() {
	let script = exec('./temp.py', (error, stdout, stderr) => {
		let tempC = parseFloat(stdout)
		let tempF = (tempC*9 / 5 + 32).toFixed(1);
		console.log(`tempc = ${tempC}`);
		console.log(`tempF = ${tempF}`);

		return tempF;
	});
	//read from temp file
	//return Math.floor((Math.random() * 100) + 1);
}
function getHumidity() {
	let script = exec('./humidity.py', (error, stdout, stderr) => {
		let humidity = parseFloat(stdout)
		console.log(`humidity = ${humidity}`);

		return humidity;
	});
}

function setTarget(target) {
	//write to target file
}

function toggleOnOff() {
	//toggle on/off 
}

app.listen(3000, () => console.log("Running on 3000"));
