
import mongoose from 'mongoose';
import { uri } from './atlas_uri.js';
import { Book } from './models/books.js';
import User from './models/users.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 5000;

mongoose
  .connect(uri)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Login endpoint
app.post('/api/userlogin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Credentials. Please check your username and password.' });
    }
  } catch (error) {
    console.error(`Error logging in: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/userupdate/:id', async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (err) {
        console.error('Error updating book:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// CRUD endpoints for books
app.get('/api/books/search', async (req, res) => {

    const {query} = req.query
    const books = await Book.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { author: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
    });

    res.status(200).json({ success: true, books });
});

// Create a new book
app.post('/api/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ success: true, book });
  } catch (err) {
    console.error('Error adding book:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Read all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, books });
  } catch (err) {
    console.error('Error fetching books:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update a book
app.put('/api/books/:id', async (req, res) => {

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });

        if (!updatedBook) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({ success: true, updatedBook });
    } catch (err) {
        console.error('Error updating book:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, deletedBook });
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
