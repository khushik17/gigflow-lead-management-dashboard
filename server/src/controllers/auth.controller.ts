import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as authService from '../services/auth.service';
import { ApiResponse } from '../utils/ApiResponse';

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, 'User registered successfully', result));
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json(new ApiResponse(200, 'Login successful', result));
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.getUserProfile(req.user!._id as unknown as string);
  res.status(200).json(new ApiResponse(200, 'User profile fetched', { user }));
});
