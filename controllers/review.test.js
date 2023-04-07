const mongodb = require('../db/connect');
const { getReviews,getSingleReviews,addReview,updateReview,deleteReview } = require('./review');
const dotenv = require('dotenv');
const { json } = require('body-parser');
dotenv.config();
let uri = process.env['MONGODB_URI'];


describe("Test handlers", function(){
    const res = {};
    
    beforeAll(async () => {
        await mongodb.initDb(uri);
        res.status = jest.fn().mockReturnValue(res);
        res.status(200).json = jest.fn().mockReturnValue(res);
        res.status(204).json = jest.fn().mockReturnValue(res);
        res.status(204).send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        
      });


    test('Get reviews', async () => {
        const req = {};
        await getReviews(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


    test('Get single review', async () => {
        const req = { params: { id: '64235ef3780fd2e7c77fcb66'}};
        await getSingleReviews(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });



    test('Add review', async () => {
        let req = {  
            body: { 
                date: 'test',
                description: 'test',
                rating: 'test'
        }};
        await addReview(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });



    test('Delete review', async () => {
        const req = { params: { id: '12345678910111'}};
        await deleteReview(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Update review', async () => {
        let req = {  
                params: { id: '64235ef3780fd2e7c77fcb66'},
                body: { 
                    date: 'testing',
                    description: 'test',
                    rating: 'test'
        }};
        await updateReview(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

});