const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book Collection App',
    description: 'Book Collection App'
  },
  host: 'https://rysn-final-week-1.onrender.com',
  
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

