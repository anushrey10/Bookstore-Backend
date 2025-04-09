const Book = require('../models/Book');

// Create a new book
// @route   POST /api/books
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all books with filtering, searching and pagination
// @route   GET /api/books
const getBooks = async (req, res) => {
  try {
    const { 
      author, 
      category, 
      rating,
      title,
      page = 1,
      limit = 10,
      sort
    } = req.query;
    
    // Build query
    const query = {};
    
    // Filter by author
    if (author) {
      query.author = author;
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by rating
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }
    
    // Search by title
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit); //source @perplexityAI
    
    // Sorting
    let sortOptions = {};
    if (sort) {
      const parts = sort.split(':');
      sortOptions[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      // Default sort by createdAt DESC
      sortOptions = { createdAt: -1 };
    }
    
    const books = await Book.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Book.countDocuments(query);
    
    res.json({
      success: true,
      count: books.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get book by ID
// @route   GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update book by ID
// @route   PUT /api/books/:id
const updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete book by ID
// @route   DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    await book.remove();
    
    res.json({
      success: true,
      message: 'Book removed'
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
};