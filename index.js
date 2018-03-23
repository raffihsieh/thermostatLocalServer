'use strict';

const express = require('express');

const app = express();

app.get('/', function (req, res) {
	let temp = getTemp();
	console.log(`PING PING PING ${temp}`);
	res.status(200).send({body: temp}); //get current temp from python code
});

app.post('/setTarget', function (req, res) {
	let target = req.body.target;
	let temp = getTemp();
});

app.post('/off', function (req, res) {

});

app.post('/heat', function (req, res) {

});

function getTemp() {
	//read from temp file
	return Math.floor((Math.random() * 100) + 1);
}

function setTarget(target) {
	//write to target file
}

function toggleOnOff() {
	//toggle on/off 
}

app.listen(3000, () => console.log("Running on 3000"));
