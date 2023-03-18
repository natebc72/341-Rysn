const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book Collection App',
    description: 'Book Collection App'
  },
  host: 'three41rysn-bookapp.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

