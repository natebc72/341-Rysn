const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 

/*////////////////
////GET Functions////
////////////////*/
const getReviews = async (req, res, next) => {
    try{
        const dbresult = await mongodb.getDb().db('project').collection('reviews').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(content);
        })
    }catch(err){
        res.status(500).json(err);
    } 
}

const getSingleReviews = async (req, res, next) => {
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
const addReview = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const review = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      rating: req.body.rating,
      user: req.body.user,
      review_content: req.body.review_content
  };
  if (!validator.validateString(review)){
      res.status(500).json('There was an error while adding the review with missing fields.');
  }else{
      const response = await mongodb.getDb().db('project').collection('reviews').insertOne(review);
      if (response.acknowledged) {
          res.status(201).json(response);
      } else {
          res.status(500).json(response.error || 'There was an error while adding the review.');
      }
  } 
};

/*////////////////
////UPDATE Function////
////////////////*/
const updateReview = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('That is not a valid ID. Please try again.');
    }
    const reviewID = new ObjectId(req.params.id);
    const review = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      rating: req.body.rating,
      user: req.body.user,
      review_content: req.body.review_content
    };
    const response = await mongodb
      .getDb()
      .db('project')
      .collection('reviews')
      .replaceOne({ _id: reviewID }, review);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while updating the review.');
    }
  };

/*////////////////
////DELETE Function////
////////////////*/
  const deleteReview = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('That is not a valid ID. Please try again.');
    }
    const reviewID = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('project').collection('reviews').deleteOne({ _id: reviewID}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting the review.');
    }
  };

module.exports = {
    getReviews,
    getSingleReviews,
    addReview,
    updateReview,
    deleteReview
}