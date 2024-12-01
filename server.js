const express = require('express');
const fetch = require('node-fetch');
const app = express();
const Datastore = require('nedb');
require('dotenv').config();

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on ${port}`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        res.json({data});
    });
});

app.post('/api', (req, res)=> {
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    res.json(data);
});

app.get('/weather/:latlon', async (request, response) => {
    const api_key = process.env.API_KEY;
    const latlon = request.params['latlon'].split(',');
    const lat = latlon[0]; const lon = latlon[1];

    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
})