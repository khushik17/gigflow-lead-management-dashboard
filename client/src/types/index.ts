export const LeadStatus = { 
  New: "New", 
  Contacted: "Contacted", 
  Qualified: "Qualified", 
  Lost: "Lost" 
} as const;

export type LeadStatus = typeof LeadStatus[keyof typeof LeadStatus];

export const LeadSource = { 
  Website: "Website", 
  Instagram: "Instagram", 
  Referral: "Referral" 
} as const;

export type LeadSource = typeof LeadSource[keyof typeof LeadSource];

export const UserRole = { 
  Admin: "admin", 
  Sales: "sales" 
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface IUser {
  _id: string; 
  name: string; 
  email: string;
  role: UserRole; 
  createdAt: string;
}

export interface ILead {
  _id: string; 
  name: string; 
  email: string;
  status: LeadStatus; 
  source: LeadSource;
  createdBy: IUser | string; 
  createdAt: string; 
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: { 
    page: number; 
    limit: number; 
    total: number; 
    totalPages: number; 
  };
}
