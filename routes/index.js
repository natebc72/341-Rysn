const routes = require('express').Router();
const express = require('express');
const app = express(); 
const path = require('path');
const axios = require('axios');
const bookController = require("../controllers/books.js");
const favoriteController = require("../controllers/favorite.js");
const reviewController = require("../controllers/review.js");
const requestController = require("../controllers/request.js");
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

routes.get('/', (req, res) => {
  res.render('index');
});
routes.get('/login', (req, res) => {
  res.render('login');
});


//OAuth
routes.get('/auth', (req,res) =>{
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  )
});

routes.get('/oauth-callback', ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data.access_token )
    .then((token) => {
      console.log('My Token: ' , token);
      res.redirect(`/?token=${token}`)
    })
    .catch((err) => res.status(500).json({ err: err.message}))
})



/*////////////////
////GET ROUTES////
////////////////*/
//Book Routes//
routes.get("/book/", bookController.getAllBooks);
routes.get("/book/:id", bookController.getSingleBook);
routes.get("/book/findByNumber/:id", bookController.findByNumber);
routes.get("/book/findByAuthor/:author", bookController.findByAuthor);
routes.get("/book/review/:id", bookController.getBookReviews);
//Favorite Routes//
routes.get("/favorite/", favoriteController.getFavorites);
routes.get("/favorite/:id", favoriteController.getFavoriteId);
routes.get("/favorite/book/:id", favoriteController.getFavoriteBook);
routes.get("/favorite/review/:id", favoriteController.getFavoriteReview);
//Reviews Routes//
routes.get("/review/", reviewController.getReviews);
routes.get("/review/:id", reviewController.getSingleReviews);
//Requests Routes//
routes.get("/request/", requestController.getRequests);
routes.get("/request/:id", requestController.getSingleRequest);
/*////////////////
////POST ROUTES////
////////////////*/
//Book Routes//
routes.post("/book/addBook", bookController.addBook);
//Favorite Routes//

//Reviews Routes//

//Requests Routes//

/*////////////////
////PUT ROUTES////
////////////////*/
//Book Routes//
routes.put("/book/", bookController.updateBook);
//Favorite Routes//
routes.put("/favorite/", favoriteController.updateFavorite);
//Reviews Routes//
routes.put("/review/", reviewController.updateReview);
//Requests Routes//
routes.put("/request/", requestController.updateRequest);

/*////////////////
////DEL ROUTES////
////////////////*/
//Book Routes//
routes.delete("/book/", bookController.deleteBook);
//Favorite Routes//
routes.delete("/favorite/", favoriteController.deleteFavorite);
//Reviews Routes//
routes.delete("/review/", reviewController.deleteReview);
//Requests Routes//
routes.delete("/request/", requestController.deleteRequest);

/*////////////////
////MISC ROUTES////
////////////////*/
routes.get('/', (req, res) => {
  res.send('Working');
});
routes.use('/', require('./swagger'))

module.exports = routes;