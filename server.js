const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database')
const app = express();

// body parser
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Resquested-With, Content-Type, Accept, Z-Key'
    ); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

// routes
app.use('/', require('./routes/'))

// Port definition
const Port = process.env.Port || 3000;


// server and database init
mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    }
    else {
        app.listen(Port, () => {console.log(`Database is listening and node runing on Port ${Port}`)})
    }
})
