import React from 'react';
import BookCard from './BookCard';
import '../css/BookGrid.css';

const BookGrid = ({ books, onEdit, onDelete }) => {
  return (
    <div className="book-grid">
      {books.map(book => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          image={book.image}
          onEdit={() => onEdit(book.id)}
          onDelete={() => onDelete(book.id)}
        />
      ))}
    </div>
  );
};

export default BookGrid;
