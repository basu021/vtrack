// apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Update with your backend server URL

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // You may include additional headers here, such as authorization headers
  },
});

export default apiService;
