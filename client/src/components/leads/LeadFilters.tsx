import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, ArrowDownUp } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { LeadStatus, LeadSource } from '../../types';

interface LeadFiltersProps {
  onFilterChange: (filters: { status?: string; source?: string; search?: string; sortBy?: string }) => void;
}

const ModernSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  icon: Icon 
}: { 
  value: string; 
  onChange: (v: string) => void; 
  options: { label: string; value: string }[]; 
  placeholder: string;
  icon: React.ElementType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="relative flex-1 md:flex-none min-w-[140px]" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`input-field select-none flex items-center justify-between w-full text-left pr-8 cursor-pointer transition-colors ${value ? 'bg-primary-50/50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30 text-primary-900 dark:text-primary-100' : 'bg-gray-50 dark:bg-dark-bg border-transparent text-gray-700 dark:text-gray-300'}`}
      >
        <span className="truncate text-sm">{selectedOption ? selectedOption.label : placeholder}</span>
        <Icon size={14} className={`absolute right-3 text-gray-400 pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl shadow-xl overflow-hidden animate-fade-in py-1">
          <button
            type="button"
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-dark-bg ${value === '' ? 'text-primary-600 font-semibold bg-primary-50/50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300'}`}
            onClick={() => { onChange(''); setIsOpen(false); }}
          >
            {placeholder}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-dark-bg ${value === opt.value ? 'text-primary-600 font-semibold bg-primary-50/50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const LeadFilters: React.FC<LeadFiltersProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('latest');

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    onFilterChange({
      search: debouncedSearch || undefined,
      status: status || undefined,
      source: source || undefined,
      sortBy
    });
  }, [debouncedSearch, status, source, sortBy]);

  const statusOptions = Object.values(LeadStatus).map(s => ({ label: s, value: s }));
  const sourceOptions = Object.values(LeadSource).map(s => ({ label: s, value: s }));
  const sortOptions = [
    { label: 'Latest First', value: 'latest' },
    { label: 'Oldest First', value: 'oldest' }
  ];

  return (
    <div className="bg-white dark:bg-dark-surface p-4 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] mb-6 flex flex-col md:flex-row gap-4 items-center justify-between transition-colors">
      <div className="relative w-full md:max-w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className={`input-field pl-10 border-transparent transition-colors ${search ? 'bg-primary-50/50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30 text-primary-900 dark:text-primary-100' : 'bg-gray-50 dark:bg-dark-bg focus:bg-white dark:focus:bg-dark-surface'}`}
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        <ModernSelect
          value={status}
          onChange={setStatus}
          options={statusOptions}
          placeholder="All Status"
          icon={Filter}
        />
        <ModernSelect
          value={source}
          onChange={setSource}
          options={sourceOptions}
          placeholder="All Sources"
          icon={Filter}
        />
        <ModernSelect
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
          placeholder="Sort By"
          icon={ArrowDownUp}
        />
      </div>
    </div>
  );
};
