// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();
const cors = require('cors');      //cross origin resource sharing. allows front end comm to backend


const PORT = 8080;

app.use(cors()); //it allows the frontend on a different port to connect. react port 3000

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + '/public/index.html');

});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
// enter this url on browser ==> http://localhost:8080/api/v1/pets
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.json(pets)

});

// get pet by owner with query string
// enter this url on browser ==>  http://localhost:8080/api/v1/pets/owner?owner=Jane
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const owner = req.query.owner;
    // res.send(`owner name ${owner}`)


    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    res.json(pet)

});

// get pet by name
// enter this url on browser ==> http://localhost:8080/api/v1/pets/Rover
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name;
    // res.send(`pet name ${name}`);


    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.json(pet)

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;