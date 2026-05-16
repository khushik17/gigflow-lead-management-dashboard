import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as leadService from '../services/lead.service';
import { ApiResponse } from '../utils/ApiResponse';

export const getLeads = catchAsync(async (req: Request, res: Response) => {
  const result = await leadService.getLeads(req.query);
  res.status(200).json({
    success: true,
    message: 'Leads fetched',
    ...result,
  });
});

export const getLead = catchAsync(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(req.params.id as string);
  res.status(200).json(new ApiResponse(200, 'Lead fetched', lead));
});

export const createLead = catchAsync(async (req: Request, res: Response) => {
  const lead = await leadService.createLead(req.body, req.user!._id as unknown as string);
  res.status(201).json(new ApiResponse(201, 'Lead created', lead));
});

export const updateLead = catchAsync(async (req: Request, res: Response) => {
  const lead = await leadService.updateLead(req.params.id as string, req.body);
  res.status(200).json(new ApiResponse(200, 'Lead updated', lead));
});

export const deleteLead = catchAsync(async (req: Request, res: Response) => {
  await leadService.deleteLead(req.params.id as string);
  res.status(200).json(new ApiResponse(200, 'Lead deleted successfully'));
});

export const exportCsv = catchAsync(async (req: Request, res: Response) => {
  const csv = await leadService.exportLeadsCsv(req.query);
  
  res.header('Content-Type', 'text/csv');
  res.attachment('leads.csv');
  res.send(csv);
});

export const getAnalytics = catchAsync(async (req: Request, res: Response) => {
  const analytics = await leadService.getLeadAnalytics();
  res.status(200).json(new ApiResponse(200, 'Analytics fetched successfully', analytics));
});
