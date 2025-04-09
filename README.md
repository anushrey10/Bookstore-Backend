# Bookstore Backend API

A RESTful API for a Bookstore Application built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with register and login endpoints
- **Books Management**: Complete CRUD operations for managing books
- **Search & Filtering**: Filter books by author, category, and rating; search by title
- **Pagination & Sorting**: Paginated results with sorting options (algorithm: perplexity)

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: JSON Web Tokens for authentication
- **Joi**: Request validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anushrey10/Bookstore-Backend.git
   cd BookStore_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- **Register a new user**
  - `POST /api/auth/register`
  - Body: `{ "email": "user@example.com", "password": "password123" }`

- **Login user**
  - `POST /api/auth/login`
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Returns: JWT token

- **Get current user**
  - `GET /api/auth/me`
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`

### Books

All book endpoints require authentication (JWT token in Authorization header)

- **Create a book**
  - `POST /api/books`
  - Body:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "category": "Fiction",
      "price": 29.99,
      "rating": 4.5,
      "publishedDate": "2023-01-15"
    }
    ```

- **Get all books**
  - `GET /api/books`
  - Query parameters:
    - `author`: Filter by author name
    - `category`: Filter by category
    - `rating`: Filter by minimum rating
    - `title`: Search by title (partial match)
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `sort`: Sort by field (e.g., `price:asc`, `rating:desc`)

- **Get book by ID**
  - `GET /api/books/:id`

- **Update book**
  - `PUT /api/books/:id`
  - Body: Same as create book

- **Delete book**
  - `DELETE /api/books/:id`

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 404: Resource not found
- 500: Server error

## Data Models

### User Model
- email (String, required, unique)
- password (String, required, min length: 6)
- createdAt (Date)

### Book Model
- title (String, required)
- author (String, required)
- category (String, required)
- price (Number, required)
- rating (Number, required, 0-5)
- publishedDate (Date, required)
- createdAt (Date)
