const mongodb = require('../db/connect');
const { getFavorites,getFavoriteId,getFavoriteBook,getFavoriteReview,addFavorite,updateFavorite,deleteFavorite } = require('./favorite');
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


    test('Get all favorites', async () => {
        const req = {};
        await getFavorites(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


    test('Get single favorites', async () => {
        const req = { params: { id: '64235e6e780fd2e7c77fcb60'}};
        await getFavoriteId(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
    test('Get single favorites', async () => {
        const req = { params: { id: '64235e6e780fd2e7c77fcb60'}};
        await getFavoriteReview(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });



    test('Get favorite book', async () => {
        const req = { params: { id: '6407701a8d68541ba17ab03d'}};
        await getFavoriteBook(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


    test('Add favorite', async () => {
        let req = {  
            body: { 
                isbn: '1234567898765',
                title: 'test',
                author: 'test',
                image: 'test'
        }};
        await addFavorite(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


    test('Update favorite', async () => {
        let req = {  
                params: { id: '6425ce0071863b5c2d0d5321'},
                body: { 
                isbn: '1234567898765',
                title: 'testing',
                author: 'test',
                image: 'test'
        }};
        await updateFavorite(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


    test('Delete favorite', async () => {
        const req = { params: { id: '6425ce0071863b5c2d0d5321'}};
        await deleteFavorite(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


});