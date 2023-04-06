const dotenv = require('dotenv')
dotenv.config();
let uri = process.env['MONGODB_URI'];
const MongoClient = require('mongodb').MongoClient;
let mc;

  async function initDb(uri) {
  try {
      mongoClient = new MongoClient(uri);
      console.log('Connecting to MongoDB Atlas cluster...');
      await mongoClient.connect();
      //console.log('Successfully connected to MongoDB Atlas!');
      mc = mongoClient;
      return mongoClient;
  } catch (error) {
      console.error('Connection to MongoDB Atlas failed!', error);
      process.exit();
  }

}
mc = initDb(uri);

const getDb = () => {
  if (!mc) {
    throw Error('Db not initialized');
  }
  return mc;
};

module.exports = {
  initDb,
  getDb,
};



