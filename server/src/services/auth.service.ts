import jwt from 'jsonwebtoken';
import { User, IUserDocument } from '../models/User.model';
import { ApiError } from '../utils/ApiError';
import { UserRole } from '../types/enums';

import { SignOptions } from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as SignOptions['expiresIn'],
  });
};

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export const registerUser = async (data: RegisterDTO) => {
  const { name, email, password, role } = data;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || UserRole.Sales,
  });

  const token = generateToken(user._id as unknown as string);

  return { user, token };
};

export interface LoginDTO {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginDTO) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken(user._id as unknown as string);
  

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};

export const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};
