const Joi = require('joi');

// Middleware factory for validations
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  
  next();
};

// User registration validation schema
const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required'
    })
});

// User login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

// Book creation validation schema
const bookSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'any.required': 'Title is required'
    }),
  author: Joi.string()
    .required()
    .messages({
      'any.required': 'Author is required'
    }),
  category: Joi.string()
    .required()
    .messages({
      'any.required': 'Category is required'
    }),
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
      'any.required': 'Price is required'
    }),
  rating: Joi.number()
    .min(0)
    .max(5)
    .required()
    .messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating cannot be less than 0',
      'number.max': 'Rating cannot be more than 5',
      'any.required': 'Rating is required'
    }),
  publishedDate: Joi.date()
    .required()
    .messages({
      'date.base': 'Published date must be a valid date',
      'any.required': 'Published date is required'
    })
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  bookSchema
};