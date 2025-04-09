const express = require('express');
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const auth = require('../middleware/auth');
const { validate, bookSchema } = require('../middleware/validation');

// All routes are protected with auth middleware
router.use(auth);

// @route   POST /api/books
// Create a new book
router.post('/', validate(bookSchema), createBook);

// @route   GET /api/books
// Get all books with filtering, searching and pagination
router.get('/', getBooks);

// @route   GET /api/books/:id
// Get book by ID
router.get('/:id', getBookById);

// @route   PUT /api/books/:id
// Update book by ID
router.put('/:id', validate(bookSchema), updateBook);

// @route   DELETE /api/books/:id
// Delete book by ID
router.delete('/:id', deleteBook);

module.exports = router;