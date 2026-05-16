import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = (error as any).errors.map((err: any) => ({ field: err.path.join('.'), message: err.message }));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
    return next(error);
  }
};
