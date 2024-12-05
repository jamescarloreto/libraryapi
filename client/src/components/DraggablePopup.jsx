
import React, { useState } from 'react';
import Draggable from 'react-draggable';

const DraggablePopup = ({ book, onClose, onSave, onDelete, isEditing }) => {
  const [isEditable, setIsEditable] = useState(isEditing);
  const [formData, setFormData] = useState(book || { title: '', author: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    if (onSave) onSave(formData);
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(book);
    onClose();
  };

  return (
    <Draggable handle=".popup-header">
      <div
        className="add-book-popup card shadow"
        style={{
          width: '300px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1050,
        }}
      >
        <div className="popup-header bg-primary text-white p-2 rounded-top cursor-grab">
          <span>Book Details</span>
          <button onClick={onClose} className="btn-close float-end"></button>
        </div>
        <div className="p-4">
          <form>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Author:</label>
              <input
                type="text"
                name="author"
                className="form-control"
                value={formData.author}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleInputChange}
                disabled={!isEditable}
              ></textarea>
            </div>
            {isEditable ? (
              <button type="button" className="btn btn-success w-100" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button type="button" className="btn btn-primary w-100" onClick={() => setIsEditable(true)}>
                Update
              </button>
            )}
            <button type="button" className="btn btn-danger w-100 mt-2" onClick={handleDeleteClick}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </Draggable>
  );
};

export default DraggablePopup;
