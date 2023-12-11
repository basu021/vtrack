// SignUp.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../services/authService';

const SignUp = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // Add other fields as needed for your user registration
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the authService function for user registration
      await authService.register(formData);

      // Redirect to login page after successful registration
      history.push('/login');
    } catch (error) {
      // Handle registration error (e.g., display an error message)
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other form fields for user registration */}
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
