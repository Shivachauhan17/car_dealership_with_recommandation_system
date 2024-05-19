import React, { useState,memo } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    selectedRole: 'user',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) tempErrors.email = 'Email is not valid';
    if (!formData.password) tempErrors.password = 'Password is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
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
    if (validate()) {
      console.log('Form data is valid:', formData);
      // Submit the form data
    } else {
      console.log('Form data is invalid:', errors);
    }
  };

  return (
    <div className='mt-10 max-w-md mx-auto'>
      <h2 className='text-3xl text-orange-500 font-bold font-sans'>Login!</h2>
        <form onSubmit={handleSubmit} className="pb-8 bg-white text-orange-500 mt-2 space-y-4 max-w-md mx-auto p-4 border border-gray-300 rounded">
        <div>
            <label>Email:</label>
            <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-black w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
            <label>Password:</label>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-black w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
            <label>Role:</label>
            <select
            name="selectedRole"
            value={formData.selectedRole}
            onChange={handleChange}
            className="text-black w-full p-2 border border-gray-300 rounded"
            >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            </select>
        </div>
        <button type="submit" className="w-full bg-sky-400 hover:bg-sky-300 text-white p-2 rounded">Login</button>
        </form>
        </div>
  );
};

export default memo(Login);
