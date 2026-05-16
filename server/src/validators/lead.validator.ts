import { z } from 'zod';
import { LeadStatus, LeadSource } from '../types/enums';

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    status: z.nativeEnum(LeadStatus),
    source: z.nativeEnum(LeadSource),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
  }),
});

export const leadQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
    search: z.string().optional(),
    sortBy: z.enum(['latest', 'oldest']).optional(),
  }),
});
