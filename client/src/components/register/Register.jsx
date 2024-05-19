// src/FormComponent.js
import React, { useState,memo } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    selectedRole: 'user',
    location: '',
    dealerInfo: '',
    userInfo: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.phoneNumber.match(/^\d{10}$/)) errors.phoneNumber = 'Phone number must be exactly 10 digits';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.location) errors.location = 'Location is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle form submission (e.g., send data to server)
      console.log('Form data:', formData);
    }
  };

  return (
    <div className='mt-10 max-w-md mx-auto'>
      <h2 className='text-3xl text-orange-500 font-bold font-sans'>Register!</h2>
      <form onSubmit={handleSubmit}   className="bg-white text-orange-500 mt-2 space-y-4 max-w-md mx-auto p-4 border border-gray-300 rounded">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div>
          <label className="block">Role:</label>
          <select
            name="selectedRole"
            value={formData.selectedRole}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div>
          <label className="block">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>

        <div>
          <label className="block">Dealer Info:</label>
          <input
            type="text"
            name="dealerInfo"
            value={formData.dealerInfo}
            onChange={handleChange}
            className=" text-black w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block">User Info:</label>
          <input
            type="text"
            name="userInfo"
            value={formData.userInfo}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-sky-400 hover:bg-sky-300 text-white p-2 rounded">
          Submit
        </button>
      </form>
      </div>
  );
};

export default memo(Register);
