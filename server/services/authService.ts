import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'skymark-secret-key';

// User registration
export async function registerUser(
  username: string, 
  email: string, 
  password: string,
  displayName?: string
): Promise<{ user: any; token: string }> {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      displayName: displayName || username
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Return user data (without password) and token
    const userData = user.toObject();
    delete userData.password;

    return { user: userData, token };
  } catch (error) {
    throw error;
  }
}

// User login
export async function loginUser(email: string, password: string): Promise<{ user: any; token: string }> {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return user data (without password) and token
    const userData = user.toObject();
    delete userData.password;

    return { user: userData, token };
  } catch (error) {
    throw error;
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<any> {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
}

// Generate JWT Token
function generateToken(user: IUser): string {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT Token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}