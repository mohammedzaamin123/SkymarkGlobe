import { apiRequest } from "./queryClient";

// User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// Register a new user
export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  const response = await apiRequest('POST', '/api/auth/register', credentials);
  const data = await response.json();
  return data;
}

// Login user
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiRequest('POST', '/api/auth/login', credentials);
  const data = await response.json();
  return data;
}

// Logout user
export async function logout(): Promise<void> {
  await apiRequest('POST', '/api/auth/logout');
  // Clear local storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    const response = await apiRequest('GET', '/api/auth/me');
    return await response.json();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Set auth token in localStorage
export function setAuthToken(token: string): void {
  localStorage.setItem('authToken', token);
}

// Get auth token from localStorage
export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

// Save user to localStorage
export function saveUser(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}

// Get user from localStorage
export function getSavedUser(): User | null {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}