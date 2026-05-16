import React from 'react';
import type { ILead } from '../../types';
import { StatusBadge } from './StatusBadge';
import { Edit2, Trash2, Eye, Mail, ExternalLink } from 'lucide-react';
import { RoleGate } from '../layout/RoleGate';
import { UserRole } from '../../types';

interface LeadTableProps {
  leads: ILead[];
  onView: (lead: ILead) => void;
  onEdit: (lead: ILead) => void;
  onDelete: (id: string) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-white/95 dark:bg-dark-surface/95 backdrop-blur z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <tr className="border-b border-gray-100 dark:border-dark-border/50 bg-transparent text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            <th className="px-6 py-4 font-medium rounded-tl-lg">Lead Details</th>
            <th className="px-6 py-4 font-medium hidden md:table-cell">Source</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium hidden lg:table-cell">Created By</th>
            <th className="px-6 py-4 font-medium hidden sm:table-cell">Date</th>
            <th className="px-6 py-4 font-medium text-right rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-dark-border/50">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-primary-50/50 dark:hover:bg-dark-border/40 even:bg-gray-50/30 dark:even:bg-dark-bg/20 transition-colors group cursor-pointer" onClick={(e) => {
              // Don't trigger row click if a button was clicked
              if ((e.target as HTMLElement).closest('button')) return;
              onView(lead);
            }}>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900 dark:text-gray-100">{lead.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                  <Mail size={12} />
                  {lead.email}
                </div>
              </td>
              <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1.5">
                  <ExternalLink size={14} className="text-gray-400" />
                  {lead.source}
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-600 dark:text-gray-300">
                {typeof lead.createdBy === 'object' ? lead.createdBy.name : 'Unknown'}
              </td>
              <td className="px-6 py-4 hidden sm:table-cell text-sm text-gray-500 dark:text-gray-400">
                {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onView(lead)}
                    className="p-1.5 text-gray-500 hover:text-primary-600 bg-gray-50 hover:bg-primary-50 rounded-md transition-colors dark:bg-gray-800 dark:hover:bg-primary-900/30 dark:text-gray-400 dark:hover:text-primary-400"
                    title="View details"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => onEdit(lead)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-md transition-colors dark:bg-gray-800 dark:hover:bg-blue-900/30 dark:text-gray-400 dark:hover:text-blue-400"
                    title="Edit lead"
                  >
                    <Edit2 size={16} />
                  </button>
                  <RoleGate roles={[UserRole.Admin]}>
                    <button 
                      onClick={() => onDelete(lead._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                      title="Delete Lead"
                    >
                      <Trash2 size={16} />
                    </button>
                  </RoleGate>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
