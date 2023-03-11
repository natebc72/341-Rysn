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

module.exports = {
    getSingleBook,
    getAllBooks,
    findByNumber,
    findByAuthor,
    getBookReviews,
}
