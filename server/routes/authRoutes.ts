import { Router, Request, Response } from 'express';
import { registerUser, loginUser, getUserById } from '../services/authService';
import { authenticate } from '../middleware/auth';

const router = Router();

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, displayName } = req.body;
    
    // Validate request
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Register user
    const { user, token } = await registerUser(username, email, password, displayName);
    
    // Set cookie with token
    res.cookie('token', token, { 
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.status(201).json({ 
      user, 
      token,
      message: 'User registered successfully' 
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Login user
    const { user, token } = await loginUser(email, password);
    
    // Set cookie with token
    res.cookie('token', token, { 
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.json({ 
      user, 
      token,
      message: 'User logged in successfully' 
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Logout user
router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Get current user
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;