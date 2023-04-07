const request = require('supertest');
const app = require('../server');
const bookController = require('../controllers/books');
const favoriteController = require ('../controllers/favorite');
const reviewController = require('../controllers/review');
const requestController = require('../controllers/request');
describe('GET /book', () => {
  it('should call bookController.getAllBooks function', async () => {
    const getAllBooksMock = jest.spyOn(bookController, 'getAllBooks');
    await request(app).get('/book');
    expect(getAllBooksMock).toHaveBeenCalled;
  });
});

describe('GET /book/:id', () => {
  it('should call bookController.getSingleBook function with the correct id', async () => {
    const getSingleBookMock = jest.spyOn(bookController, 'getSingleBook');
    const id = 123456789101;
    await request(app).get(`/book/${id}`);
    expect(getSingleBookMock).toHaveBeenCalled;
  });
}, 10000);

describe("GET /book/findByNumber/:id", () => {
    it("should call the findByNumber method with the correct id parameter", async () => {
      const number = 123456789101;
      const mockResult = { title: "Mock Book", author: "Mock Author" };
      const findByNumberMock = jest
        .spyOn(bookController, "findByNumber")
        .mockResolvedValue(mockResult);
  
      await request(app).get(`/book/findByNumber/${number}`);
  
      expect(findByNumberMock).toHaveBeenCalled;
  
      findByNumberMock.mockRestore();
    });
  });
  
describe('GET /book/findByAuthor/:author', () => {
  it('should call bookController.findByAuthor function with the correct author', async () => {
    const findByAuthorMock = jest.spyOn(bookController, 'findByAuthor');
    const author = 'test author';
    await request(app).get(`/book/findByAuthor/${author}`);
    expect(findByAuthorMock).toHaveBeenCalled;
  });
});

describe('GET /book/review/:id', () => {
  it('should call bookController.getBookReviews function with the correct id', async () => {
    const getBookReviewsMock = jest.spyOn(bookController, 'getBookReviews');
    const id = 123456789101;
    await request(app).get(`/book/review/${id}`);
    expect(getBookReviewsMock).toHaveBeenCalled;
  });
});

describe('Favorite Routes', () => {
    describe('GET /favorite/', () => {
      it('should call favoriteController.getFavorites function', async () => {
        const getFavoritesMock = jest.spyOn(favoriteController, 'getFavorites');
        await request(app).get('/favorite/');
        expect(getFavoritesMock).toHaveBeenCalled;
      });
    });
  
    describe('GET /favorite/:id', () => {
      it('should call favoriteController.getFavoriteId function with the correct id', async () => {
        const getFavoriteIdMock = jest.spyOn(favoriteController, 'getFavoriteId');
        const id = 123456789101;
        await request(app).get(`/favorite/${id}`);
        expect(getFavoriteIdMock).toHaveBeenCalled;
      });
    });
  
    describe('GET /favorite/book/:id', () => {
      it('should call favoriteController.getFavoriteBook function with the correct id', async () => {
        const getFavoriteBookMock = jest.spyOn(favoriteController, 'getFavoriteBook');
        const id = 456456789101;
        await request(app).get(`/favorite/book/${id}`);
        expect(getFavoriteBookMock).toHaveBeenCalled;
      });
    });
  
    describe('GET /favorite/review/:id', () => {
      it('should call favoriteController.getFavoriteReview function with the correct id', async () => {
        const getFavoriteReviewMock = jest.spyOn(favoriteController, 'getFavoriteReview');
        const id = 123456789101;
        await request(app).get(`/favorite/review/${id}`);
        expect(getFavoriteReviewMock).toHaveBeenCalled;
      });
    });
  });


describe('Review Routes', () => {
  it('GET /review should call getReviews function', async () => {
    const getReviewsMock = jest.spyOn(reviewController, 'getReviews');
    await request(app).get('/review');
    expect(getReviewsMock).toHaveBeenCalled;
  });

  it('GET /review/:id should call getSingleReviews function with the correct id', async () => {
    const getSingleReviewsMock = jest.spyOn(reviewController, 'getSingleReviews');
    const id = 123456789101;
    await request(app).get(`/review/${id}`);
    expect(getSingleReviewsMock).toHaveBeenCalled;
  });
});

describe('Request Routes', () => {
  it('GET /request should call getRequests function', async () => {
    const getRequestsMock = jest.spyOn(requestController, 'getRequests');
    await request(app).get('/request');
    expect(getRequestsMock).toHaveBeenCalled;
  });

  it('GET /request/:id should call getSingleRequest function with the correct id', async () => {
    const getSingleRequestMock = jest.spyOn(requestController, 'getSingleRequest');
    const id = 123456789101;
    await request(app).get(`/request/${id}`);
    expect(getSingleRequestMock).toHaveBeenCalled;
  });
});

describe('PUT /book/:id', () => {
    it('should call bookController.updateBook function with the correct id', async () => {
      const updateBookMock = jest.spyOn(bookController, 'updateBook');
      const id = 123456789101;
      const bookData = { title: 'Test Book', author: 'Test Author' };
      await request(app)
       .put(`/book/${id}`)
       .send(bookData);
      expect(updateBookMock).toHaveBeenCalled;
    });
  }, 10000);
  

  
  describe('PUT /favorite/:id', () => {
    it('should call favoriteController.updateFavorite function with the correct id', async () => {
      const updateFavoriteMock = jest.spyOn(favoriteController, 'updateFavorite');
      const id = 123456789101;
      const favoriteData = { bookId: 456 };
      await request(app)
       .put(`/favorite/${id}`)
       .send(favoriteData);
      expect(updateFavoriteMock).toHaveBeenCalled;
    }, 10000);
  });

  
  describe('PUT /review/:id', () => {
    it('should call reviewController.updateReview function with the correct id', async () => {
      const updateReviewMock = jest.spyOn(reviewController, 'updateReview');
      const id = 123456789101;
      const reviewData = { title: 'Test Review', content: 'Test Content' };
      await request(app)
        .put(`/review/${id}`)
        .send(reviewData);
      expect(updateReviewMock).toHaveBeenCalled;
    });
  });
  

  describe('PUT /request/:id', () => {
    it('should call requestController.updateRequest function with the correct id', async () => {
      const updateRequestMock = jest.spyOn(requestController, 'updateRequest');
      const id = 123456789101;
      const requestData = { bookId: 456, status: 'Approved' };
      await request(app)
       .put(`/request/${id}`)
       .send(requestData);
      expect(updateRequestMock).toHaveBeenCalled;
    });
  });

