import React from 'react';
import type { ILead } from '../../types';
import { StatusBadge } from './StatusBadge';

interface LeadDetailsProps {
  lead: ILead;
}

export const LeadDetails: React.FC<LeadDetailsProps> = ({ lead }) => {
  const creator = typeof lead.createdBy === 'object' ? lead.createdBy : { name: 'Unknown', email: '' };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 text-gray-800 dark:text-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
          <p className="font-medium text-lg">{lead.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
          <p className="font-medium text-lg">
            <a href={`mailto:${lead.email}`} className="text-primary-600 hover:underline dark:text-primary-400">
              {lead.email}
            </a>
          </p>
        </div>

        {/* Status & Source */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Status</p>
          <div className="mt-1">
            <StatusBadge status={lead.status} />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Lead Source</p>
          <p className="font-medium inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            {lead.source}
          </p>
        </div>

        {/* Creator Info */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Created By</p>
          <p className="font-medium">{creator.name}</p>
          {creator.email && <p className="text-xs text-gray-500 dark:text-gray-400">{creator.email}</p>}
        </div>

        {/* Timestamps */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Created At</p>
          <p className="font-medium text-sm">{formatDate(lead.createdAt)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
          <p className="font-medium text-sm">{formatDate(lead.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};
