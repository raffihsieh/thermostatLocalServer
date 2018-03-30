'use strict';

import {execAsync} from 'async-child-process';

const express = require('express');

const app = express();

app.get('/', async (req, res) => {
	let temperature = await getTemp();
	let humidity = await getHumidity();
	res.status(200).send({temperature, humidity}); //get current temp from python code
});

app.get('/temp', async (req, res) => {
	let temperature = await getTemp(res);
	res.status(200).send({temperature}); //get current temp from python code
});

app.get('/hum', async (req, res) => {
	let humidity = await getHumidity();
	res.status(200).send({humidity}); //get current temp from python code
});

app.get('/setTarget', (req, res) => {
	let target = req.query.targetTemp;
	//TODO: set target temp
	console.log(`set the target temp to ${target}`);
	res.status(200).send({targetTemp: target});
});

app.post('/off', function (req, res) {

});

app.post('/heat', function (req, res) {

});

async function getTemp() {
	let {stdout} = await execAsync('./build/temp.py');
	let tempFRaw = stdout*9 / 5 + 32;
	let tempF = Math.round(tempFRaw * 1e1) / 1e1;
	console.log(`tempc = ${stdout}`);
	console.log(`tempF = ${tempF}`);

	return tempF;
}
async function getHumidity() {
	let {stdout} = await execAsync('./build/humidity.py');
	let humidity = parseFloat(stdout)
	console.log(`humidity = ${humidity}`);

	return humidity;
}

function setTarget(target) {
	//write to target file
}

function toggleOnOff() {
	//toggle on/off 
}

app.listen(3000, () => console.log("Running on 3000"));
