import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Target } from 'lucide-react';

export const SalesWelcomeBanner: React.FC = () => {
  const { user } = useAuth();

  if (user?.role !== 'sales') return null;

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/80 dark:from-dark-surface dark:to-dark-surface rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-200/60 dark:border-dark-border/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 mb-6 relative overflow-hidden animate-fade-in group cursor-default">
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg text-sm">
            Ready to close some deals today? This is your personal workspace. Focus on engaging new leads and converting your pipeline into successful sales.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
              <Target className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Daily Mission</p>
              <p className="font-bold text-sm tracking-wide text-gray-900 dark:text-white">Close Deals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
