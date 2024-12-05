
import React, { useEffect, useState } from 'react';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import { fetchBooks, addBook, updateBook, deleteBook, searchBook } from '../utils/axios';
import '../css/Books.css';
import BookCard from '../components/BookCard';
import DraggablePopup from '../components/DraggablePopup';

const Books = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([
    // { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', description: 'A classic novel set in the Jazz Age.' },
    // { title: 'To Kill a Mockingbird', author: 'Harper Lee', description: 'A novel about racial injustice in the Deep South.' },
    // { title: '1984', author: 'George Orwell', description: 'A dystopian novel about totalitarianism.' },
    // { title: 'Moby Dick', author: 'Herman Melville', description: 'A story of Captain Ahab’s obsession with a giant whale.' },
    // { title: 'Pride and Prejudice', author: 'Jane Austen', description: 'A romantic novel about manners and marriage in early 19th century England.' },
    // { title: 'The Catcher in the Rye', author: 'J.D. Salinger', description: 'A story about teenage angst and rebellion.' }
  ]);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
    setIsEditing(false);
  };

  const handleAddButtonClick = () => {
    setSelectedBook({ title: '', author: '', description: '' });
    setShowPopup(true);
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedBook(null);
  };

  const handleSaveBook = async (updatedBook) => {
    if (selectedBook && selectedBook.title === '') {
      // Adding a new book
      await addBook(updatedBook);
    } else {
      // Updating an existing book
      await updateBook(updatedBook._id, { title: updatedBook.title, author: updatedBook.author, description: updatedBook.description });
    }
    loadBooks();
    setShowPopup(false);
    setSelectedBook(null);
  };

  const handleDeleteBook = async (bookToDelete) => {
    await deleteBook(bookToDelete._id);
    loadBooks();
  };

  const handleSearchBook = async (query) => {
    if (query) {
      const books = await searchBook(query);
      setBooks(books);
    } else {
      loadBooks();
    }
  };

  const loadBooks = async () => {
    const data = await fetchBooks();

    setBooks(data);
  };

  useEffect(() => {
      loadBooks(); 
  }, []);

  return (
    <div className="books-page">
      <h1 className="books-header">Books</h1>
      <div className="search-bar mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search books by title, author, or description..."
          // value={searchQuery}
          onChange={(e) => handleSearchBook(e.target.value)}
        />
      </div>
      <div className="books-container">
        {books && books.map((book, index) => (
          <div key={index} className="book-card-container" onClick={() => handleCardClick(book)}>
            <div
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBook(book);
              }}
            >
              <FaTrash />
            </div>
            <BookCard title={book.title} author={book.author} description={book.description} />
          </div>
        ))}
      </div>
      <div className="floating-button">
        <button onClick={handleAddButtonClick} className="btn btn-primary rounded-circle">
          <FaPlusCircle size={50} />
        </button>
      </div>
      {showPopup && (
        <DraggablePopup
          book={selectedBook}
          onClose={handleClosePopup}
          onSave={handleSaveBook}
          onDelete={handleDeleteBook}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Books;
