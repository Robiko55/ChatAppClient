// frontend/src/api/api.js

import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend server URL

const api = axios.create({
  baseURL: `${backendUrl}/api`, // Assuming your API endpoints are under /api on the backend
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers if eded (e.g., authorization headers)
  },
});

export default api;
