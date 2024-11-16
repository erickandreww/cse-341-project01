const swaggetAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts Api',
        descrioption: 'Contacts Api'
    }, 
    host: 'localhost:3000',
    schemes: ['http', 'https']
}; 

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js']

// this will generate swagger.json
swaggetAutogen(outputfile, endpointsFiles, doc);