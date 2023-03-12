const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 

/*////////////////
////GET Functions////
////////////////*/
const getSingleBook = async (req, res, next) => {
    try{
        queryId = req.params.id;
        if(!queryId){
            res.status(400).json("Missing id to query with");
        }
        const dbresult = await mongodb.getDb().db().collection('book').find();
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
const getAllBooks = async (req, res, next) => {
    try{
        const dbresult = await mongodb.getDb().db().collection('book').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(element);
        })
    }catch(err){
        res.status(500).json(err);
    } 
}
const findByNumber = async (req, res, next) => {
    try{
        queryId = req.params.id;
        if(!queryId){
            res.status(400).json("Missing author to query with");
        }
        const dbresult = await mongodb.getDb().db().collection('book').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            const element = content.filter(contact => contact.ISBN.toString() == queryId);
            res.status(200).json(element);
        })
    }catch(err){
        res.status(500).json(err);
    } 
}
const findByAuthor = async (req, res, next) => {
    try{
        queryId = req.params.author;
        if(!queryId){
            res.status(400).json("Missing id to query with");
        }
        const dbresult = await mongodb.getDb().db().collection('book').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            const element = content.filter(contact => contact.author.toString() == queryId);
            res.status(200).json(element);
        })
    }catch(err){
        res.status(500).json(err);
    } 
}
const getBookReviews = async (req, res, next) => {
    try{
        queryId = req.params.id;
        if(!queryId){
            res.status(400).json("Missing id to query with");
        }
        const dbresult = await mongodb.getDb().db().collection('reviews').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            const element = content.filter(contact => contact.bookID.toString() == queryId);
            res.status(200).json(element);
        })
    }catch(err){
        res.status(500).json(err);
    } 
}

const addBook = async (req, res) => {
    const collection = await mongodb.getDb().db().collection('book')
    collection.insertOne(req.body).then(result => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).json(response.error || 'An error occurred while updating the book.');
    })
  };

const updateBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('That is not a valid ID. Please try again.');
    }
    const bookId = new ObjectId(req.params.id);
    const book = {

      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      release: req.body.release,
      genre: req.body.genre,
      synopsis: req.body.synopsis,
      photo: req.body.photo
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .replaceOne({ _id: bookId }, book);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while updating the book.');
    }
  };
  
  const deleteBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('That is not a valid ID. Please try again.');
    }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('books').remove({ _id: bookId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting the book.');
    }
  };

module.exports = {
    getSingleBook,
    getAllBooks,
    findByNumber,
    findByAuthor,
    getBookReviews,
    updateBook,
    deleteBook,
    addBook
}
