import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LogOut, Moon, Sun, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border h-16 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-200">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
          S
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
          SmartLeads
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition-colors text-gray-600 dark:text-gray-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <UserIcon size={16} />
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-gray-900 dark:text-gray-100 leading-none mb-1">{user.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs capitalize leading-none">{user.role}</p>
              </div>
            </div>
            <div className="h-6 w-px bg-gray-200 dark:bg-dark-border"></div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
