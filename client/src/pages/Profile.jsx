import React, { useState, useEffect } from 'react';
import '../css/Profile.css';
import { userUpdate } from '../utils/axios';

const Profile = ({ profile }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    contactNo: '',
    address: '',
    occupation: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); 
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.username || !formData.contactNo || !formData.address || !formData.occupation) {
      console.log('All fields are required!');
      return;
    }

    try {
      const response = await userUpdate(profile._id, formData);
      console.log('Response:', response.data);

      if (response.data.success) {
        console.log('Profile updated successfully!');
      } else {
        console.log('Failed to update profile. Please try again.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      console.log('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Profile Page</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullname"
                placeholder="Enter your full name"
                value={formData.fullname} 
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username} 
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactNo" className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control"
                id="contactNo"
                name="contactNo"
                placeholder="Enter your contact number"
                value={formData.contactNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="occupation" className="form-label">Occupation</label>
              <input
                type="text"
                className="form-control"
                id="occupation"
                name="occupation"
                placeholder="Enter your occupation"
                value={formData.occupation}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
