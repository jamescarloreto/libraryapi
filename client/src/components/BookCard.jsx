
import React from 'react';
import '../css/BookCard.css';

const BookCard = ({ title, author, description }) => {
  return (
    <div className="book-card">
      <h3 className="book-title">{title}</h3>
      <p className="book-author">{author}</p>
      <p className="book-description">{description}</p>
    </div>
  );
};

export default BookCard;
