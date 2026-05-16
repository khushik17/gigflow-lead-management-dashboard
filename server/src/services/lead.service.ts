import mongoose from 'mongoose';
import { Lead, ILeadDocument } from '../models/Lead.model';
import { LeadQuery, PaginatedResponse } from '../types/api';
import { ApiError } from '../utils/ApiError';
import { Parser } from 'json2csv';

export const getLeads = async (query: LeadQuery) => {
  const filter: Record<string, unknown> = {};
  
  if (query.status) filter.status = query.status;
  if (query.source) filter.source = query.source;
  
  if (query.search) {
    const regex = new RegExp(query.search, 'i');
    filter.$or = [{ name: regex }, { email: regex }];
  }

  const sort: Record<string, 1 | -1> = query.sortBy === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Lead.find(filter).sort(sort).skip(skip).limit(limit).populate('createdBy', 'name email'),
    Lead.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getLeadById = async (id: string) => {
  const lead = await Lead.findById(id).populate('createdBy', 'name email');
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  return lead;
};

export const createLead = async (data: Partial<ILeadDocument>, userId: string) => {
  const lead = await Lead.create({
    ...data,
    createdBy: userId,
  });
  return lead;
};

export const updateLead = async (id: string, data: Partial<ILeadDocument>) => {
  const lead = await Lead.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  return lead;
};

export const deleteLead = async (id: string) => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  return lead;
};

export const exportLeadsCsv = async (query: Omit<LeadQuery, 'page' | 'limit'>) => {
  const filter: Record<string, unknown> = {};
  
  if (query.status) filter.status = query.status;
  if (query.source) filter.source = query.source;
  
  if (query.search) {
    const regex = new RegExp(query.search, 'i');
    filter.$or = [{ name: regex }, { email: regex }];
  }

  const sort: Record<string, 1 | -1> = query.sortBy === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  
  const leads = await Lead.find(filter).sort(sort).lean();
  
  if (leads.length === 0) {
    throw new ApiError(404, 'No leads found to export');
  }

  const fields = ['_id', 'name', 'email', 'status', 'source', 'createdAt', 'updatedAt'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(leads);

  return csv;
};

export const getLeadAnalytics = async () => {
  const result = await Lead.aggregate([
    {
      $facet: {
        totalLeads: [{ $count: 'count' }],
        qualifiedLeads: [{ $match: { status: 'Qualified' } }, { $count: 'count' }],
        lostLeads: [{ $match: { status: 'Lost' } }, { $count: 'count' }],
        newLeadsThisMonth: [
          { 
            $match: { 
              createdAt: { 
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) 
              } 
            } 
          },
          { $count: 'count' }
        ],
        byStatus: [
          { $group: { _id: '$status', count: { $sum: 1 } } }
        ],
        bySource: [
          { $group: { _id: '$source', count: { $sum: 1 } } }
        ]
      }
    }
  ]);

  const stats = result[0];
  const total = stats.totalLeads[0]?.count || 0;
  const qualified = stats.qualifiedLeads[0]?.count || 0;
  const lost = stats.lostLeads[0]?.count || 0;
  const newThisMonth = stats.newLeadsThisMonth[0]?.count || 0;

  const conversionRate = total > 0 ? ((qualified / total) * 100).toFixed(1) : 0;

  const byStatus = stats.byStatus.map((item: { _id: string; count: number }) => ({ name: item._id, value: item.count }));
  const bySource = stats.bySource.map((item: { _id: string; count: number }) => ({ name: item._id, value: item.count }));

  return {
    totalLeads: total,
    qualifiedLeads: qualified,
    lostLeads: lost,
    newLeadsThisMonth: newThisMonth,
    conversionRate: Number(conversionRate),
    byStatus,
    bySource
  };
};
