const routes = require('express').Router();
const express = require('express');
const bookController = require("../controllers/books.js");
const favoriteController = require("../controllers/favorite.js");
const reviewController = require("../controllers/review.js");
const requestController = require("../controllers/request.js");

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

//Favorite Routes//

//Reviews Routes//

//Requests Routes//

/*////////////////
////PUT ROUTES////
////////////////*/
//Book Routes//
routes.get("/book/", bookController.updateBook);
//Favorite Routes//
routes.get("/favorite/", favoriteController.updateFavorite);
//Reviews Routes//
routes.get("/review/", reviewController.updateReview);
//Requests Routes//
routes.get("/request/", requestController.updateRequest);

/*////////////////
////DEL ROUTES////
////////////////*/
//Book Routes//
routes.get("/book/", bookController.deleteBook);
//Favorite Routes//
routes.get("/favorite/", favoriteController.deleteFavorite);
//Reviews Routes//
routes.get("/review/", reviewController.deleteReview);
//Requests Routes//
routes.get("/request/", requestController.deleteRequest);

/*////////////////
////MISC ROUTES////
////////////////*/
routes.get('/', (req, res) => {
  res.send('Working');
});

module.exports = routes;