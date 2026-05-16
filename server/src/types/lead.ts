import { LeadStatus, LeadSource } from './enums';

export interface ILead {
  _id: string; 
  name: string; 
  email: string;
  status: LeadStatus; 
  source: LeadSource;
  createdBy: string; 
  createdAt: string; 
  updatedAt: string;
}
