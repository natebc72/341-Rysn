const mongodb = require('../db/connect');
const { getRequests,getSingleRequest,addRequest,deleteRequest,updateRequest, } = require('./request');
const dotenv = require('dotenv');
const { json } = require('body-parser');
dotenv.config();
let uri = process.env['MONGODB_URI'];


describe("Test handlers", function(){
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.status(200).json = jest.fn().mockReturnValue(res);
    res.status(204).json = jest.fn().mockReturnValue(res);
    res.status(204).send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    beforeAll(async () => {
        await mongodb.initDb(uri);
        
        
      });


    test('Get requests', async () => {
        const req = {};
        await getRequests(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


    test('Get single request', async () => {
        const req = { params: { id: '64235e6e780fd2e7c77fcb60'}};
        await getSingleRequest(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });



    test('Add request', async () => {
        let req = {  
            body: { 
                date: 'test',
                description: 'test',
                rating: 'test'
        }};
        await addRequest(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });



    test('Delete request', async () => {
        const req = { params: { id: ''}};
        await deleteRequest(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Update request', async () => {
        let req = {  
                params: { id: ''},
                body: { 
                    date: 'testing',
                    description: 'test',
                    rating: 'test'
        }};
        await updateRequest(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

});