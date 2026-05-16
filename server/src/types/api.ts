import { LeadStatus, LeadSource } from './enums';

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiResponse<T> { 
  success: boolean; 
  message: string; 
  data?: T; 
  errors?: ApiErrorDetail[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: { 
    page: number; 
    limit: number; 
    total: number; 
    totalPages: number; 
  };
}

export interface LeadQuery {
  status?: LeadStatus; 
  source?: LeadSource;
  search?: string; 
  sortBy?: "latest" | "oldest";
  page?: number; 
  limit?: number;
}
