const mongodb = require('../db/connect');
const { getSingleBook, getAllBooks, findByAuthor, getBookReviews, updateBook, deleteBook, addBook, deletebookIsbn } = require('./books');
const dotenv = require('dotenv');
const { json } = require('body-parser');
dotenv.config();
let uri = process.env['MONGODB_URI'];


describe("Test handlers", function(){
    beforeAll(async () => {
        await mongodb.initDb(uri);
      });


    test('Get single book', async () => {
        const req = { params: { id: '6407701a8d68541ba17ab03d'}};
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.status(200).json = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        await getSingleBook(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });



    test('Get all books', async () => {
        const req = {};
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.status(200).json = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        await getAllBooks(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });



    test('Find book by isbn', async () => {
        const req = { params: { id: '9780765337320'}};
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.status(200).json = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        await getAllBooks(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });



    test('Find book by author', async () => {
        const req = { params: { author: 'Card, Orson Scott'}};
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.status(200).json = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        await findByAuthor(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


    test('Find reviews by book', async () => {
        const req = { params: { id: '6424e868e5f21761168fa0cd'}};
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.status(200).json = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        await getBookReviews(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


    test('Add new book', async () => {
        let req = {  
                body: { 
                isbn: '1234567891012',
                title: 'terds',
                author: 'test',
                release: 'test',
                genre: 'test',
                synopsis: 'test',
                photo: 'test'
        }};
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.status(200).json = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        await addBook(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
        req = { params: { id: '1234567891012'}};
        await deletebookIsbn(req,res);
    });


    test('Update book', async () => {
        const res = {};
        const req = { 
            params: { id: '6425c65be9267e31b7278dda'}, 
            body: { 
            isbn: '1234567891011',
            title: 'updated',
            author: 'updated',
            release: 'test',
            genre: 'test',
            synopsis: 'test',
            photo: 'test'
        }};
        
        res.status = jest.fn().mockReturnValue(res);
        res.status(200).json = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        await updateBook(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });


    test('Delete single book', async () => {
        const req = { params: { id: '6425c4d3bf95d31fc68fd72d'}};
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.status(204).json = jest.fn().mockReturnValue(res);
        res.status(204).send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        await deleteBook(req,res);
        expect(res.status).toHaveBeenCalledWith(204);
    });
});