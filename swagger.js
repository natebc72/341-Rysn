const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Rysn Tide Books App',
    description: 'Book Collection for Rysn Tide Books'
  },
  host: 'three41rysn-bookapp.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

