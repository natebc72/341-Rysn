const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 
const validator = require('../library/validate');

/*////////////////
////GET Functions////
////////////////*/
const getFavorites = async (req, res, next) => {
    try{
        const dbresult = await mongodb.getDb().db('project').collection('favorites').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(content);
        })
    }catch(err){
        res.status(500).json(err);
    } 
}

const getFavoriteId = async (req, res, next) => {
    try{
        queryId = req.params.id;
        if(!queryId){
            res.status(400).json("Missing id to query with");
        }
        const dbresult = await mongodb.getDb().db('project').collection('favorites').find();
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

const getFavoriteBook = async (req, res, next) => {
    try{
        queryId = req.params.id;
        if(!queryId){
            res.status(400).json("Missing id to query with");
        }
        const dbresult = await mongodb.getDb().db('project').collection('book').find();
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

const getFavoriteReview = async (req, res, next) => {
    try{
        queryId = req.params.id;
        if(!queryId){
            res.status(400).json("Missing id to query with");
        }
        const dbresult = await mongodb.getDb().db('project').collection('reviews').find();
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
const addFavorite = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const favorite = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        image: req.body.image
      };
    if(!validator.validateInt(favorite.isbn)){
        res.status(500).json('There was an error while adding the favorite with the ISBN.');
    }else if (!validator.validateString(favorite)){
        res.status(500).json('There was an error while adding the favorite with missing fields.');
    }else{
        const response = await mongodb.getDb().db('project').collection('favorites').insertOne(favorite);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'There was an error while adding the favorite.');
        }
    } 
  };

  /*////////////////
////UPDATE Function////
////////////////*/

const updateFavorite = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('That is not a valid ID. Please try again.');
    }
    const favoriteID = new ObjectId(req.params.id);
    const favorite = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      image: req.body.image
    };
    const response = await mongodb
      .getDb()
      .db('project')
      .collection('favorites')
      .replaceOne({ _id: favoriteID }, favorite);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while updating the favorite.');
    }
  };

  /*////////////////
////DELETE Function////
////////////////*/
  
  const deleteFavorite = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('That is not a valid ID. Please try again.');
    }
    const favoriteID = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('project').collection('favorites').deleteOne({ _id: favoriteID}, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting the favorite.');
    }
  };

module.exports = {
    getFavorites,
    getFavoriteId,
    getFavoriteBook,
    getFavoriteReview,
    addFavorite,
    updateFavorite,
    deleteFavorite
}
