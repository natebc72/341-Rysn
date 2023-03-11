const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 

/*////////////////
////GET Functions////
////////////////*/
const getRequests = async (req, res, next) => {
    try{
        const dbresult = await mongodb.getDb().db().collection('requests').find();
        const dbresultArray = dbresult.toArray();
        dbresultArray.then((content) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(element);
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
        const dbresult = await mongodb.getDb().db().collection('requests').find();
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

module.exports = {
    getRequests,
    getSingleRequest,
}