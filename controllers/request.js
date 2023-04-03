const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 
const validator = require('../library/validate');

/*////////////////
////GET Functions////
////////////////*/
const getRequests = async (req, res, next) => {
    try{
        const dbresult = await mongodb.getDb().db('project').collection('requests').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(content);
        })
    }catch(err){
        res.status(500).json(err);
    } 
}

const getSingleRequest = async (req, res, next) => {
    try{
        queryId = req.params.id;
        if(!queryId){
            res.status(400).json("Missing id to query with");
        }
        const dbresult = await mongodb.getDb().db('project').collection('requests').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            const element = content.filter(contact => contact._id.toString() == queryId);
            res.status(200).json(element);
        })
    }catch(err){
        res.status(500).json(err);
    } 
}

/*////////////////
////POST Function////
////////////////*/
const addRequest = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const request = {
    title: req.body.title,
    author: req.body.author,
    requestor: req.body.requestor,
    email: req.body.email,
    date: req.body.date
  };
  if(!validator.validateInt(request.isbn)){
      res.status(500).json('There was an error while adding the request with the ISBN.');
  }else if (!validator.validateString(request)){
      res.status(500).json('There was an error while adding the request with missing fields.');
  }else{
      const response = await mongodb.getDb().db('project').collection('requests').insertOne(request);
      if (response.acknowledged) {
          res.status(201).json(response);
      } else {
          res.status(500).json(response.error || 'There was an error while adding the request.');
      }
  } 
};

/*////////////////
////UPDATE Function////
////////////////*/

const updateRequest = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('That is not a valid ID. Please try again.');
    }
    const requestID = new ObjectId(req.params.id);
    const request = {
      title: req.body.title,
      author: req.body.author,
      requestor: req.body.requestor,
      email: req.body.email,
      date: req.body.date
    };
    const response = await mongodb
      .getDb()
      .db('project')
      .collection('requests')
      .replaceOne({ _id: requestID }, request);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while updating the request.');
    }
  };

  /*////////////////
////DELETE Function////
////////////////*/
  
  const deleteRequest = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('That is not a valid ID. Please try again.');
    }
    const requestID = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('project').collection('requests').deleteOne({ _id: requestID}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting the request.');
    }
  };

module.exports = {
    getRequests,
    getSingleRequest,
    addRequest,
    updateRequest,
    deleteRequest,
}