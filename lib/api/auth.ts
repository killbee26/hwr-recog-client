// src/api/auth.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
 // Adjust to your backend URL

// Define types for user data and credentials
interface UserData {
  name: string;
  email: string;
  password: string;
  image?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Register a new user
export const registerUser = async (userData: UserData): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/api/users/register`, userData);
    return response.data; // Return the user data or token
  } catch (error: any) {
    // Throw an error if registration fails
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Log in a user
export const loginUser = async (credentials: LoginCredentials): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, credentials);
    return response.data; // Return the user data or token
  } catch (error: any) {
    // Throw an error if login fails
    throw error.response?.data || { message: 'Login failed' };
  }
};

