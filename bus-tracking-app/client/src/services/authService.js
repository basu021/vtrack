// authService.js
import apiService from './apiService';

const authService = {
  login: async (credentials) => {
    try {
      const response = await apiService.post('/auth/login', credentials);
      // Assuming your backend returns a token upon successful login
      const { token, user } = response.data;
      // Store the token in localStorage or a state management solution (e.g., Redux)
      localStorage.setItem('token', token);
      // You might also want to store user information for the authenticated user
      return user;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    // Perform any necessary cleanup, such as removing tokens from storage
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    // Check if the user is authenticated based on the presence of a token
    return !!localStorage.getItem('token');
  },

  // Other authentication-related methods (e.g., user registration) can be added here
};

export default authService;
