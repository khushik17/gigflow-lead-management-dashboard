import React from 'react';
import { LeadStatus } from '../../types';
import clsx from 'clsx';

export const StatusBadge: React.FC<{ status: LeadStatus }> = ({ status }) => {
  const styles = {
    [LeadStatus.New]: 'bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300',
    [LeadStatus.Contacted]: 'bg-yellow-50 text-yellow-700 border border-yellow-200/60 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-300',
    [LeadStatus.Qualified]: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:text-emerald-300',
    [LeadStatus.Lost]: 'bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-900/20 dark:border-rose-800/50 dark:text-rose-300',
  };

  return (
    <span className={clsx('px-2.5 py-1 rounded-full text-xs font-medium', styles[status])}>
      {status}
    </span>
  );
};
