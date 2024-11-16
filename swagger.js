const swaggetAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts Api',
        descrioption: 'Contacts Api'
    }, 
    host: 'cse-341-project01-np39.onrender.com',
    schemes: ['https']
}; 

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js']

// this will generate swagger.json
swaggetAutogen(outputfile, endpointsFiles, doc);