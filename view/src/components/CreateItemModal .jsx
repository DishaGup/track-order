import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem } from '../store/actions/itemActions'; // Import the action to create an item
import { AiOutlineCloseCircle } from 'react-icons/ai';

const CreateItemModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    // Add other properties of itemSchema here
  });

  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.authReducer);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createItem(formData, token)); // Dispatch the action to create an item
    onClose(); // Close the modal after submitting
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
      <button> <AiOutlineCloseCircle onClick={onClose} /> </button>
        <h2>Create New Item</h2>
      
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateItemModal;
