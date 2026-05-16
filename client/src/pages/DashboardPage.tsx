import React, { useState, useEffect, useCallback } from 'react';
import type { ILead } from '../types';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Plus, Download } from 'lucide-react';
import { Button } from '../components/common/Button';
import { LeadFilters } from '../components/leads/LeadFilters';
import { LeadTable } from '../components/leads/LeadTable';
import { Pagination } from '../components/common/Pagination';
import { Spinner } from '../components/common/Spinner';
import { TableSkeleton } from '../components/common/TableSkeleton';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { LeadForm } from '../components/leads/LeadForm';
import { LeadDetails } from '../components/leads/LeadDetails';
import { AdminAnalytics } from '../components/dashboard/AdminAnalytics';
import { SalesWelcomeBanner } from '../components/dashboard/SalesWelcomeBanner';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const { user } = useAuth();
  

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<ILead | null>(null);
  const [analyticsRefreshTrigger, setAnalyticsRefreshTrigger] = useState(0);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {
        page: page.toString(),
        limit: '10',
      };
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params[key] = value as string;
        }
      });

      const res = await api.get('/leads', { params });
      setLeads(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
      setAnalyticsRefreshTrigger(prev => prev + 1); // Trigger analytics refresh
    } catch (error: any) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page on new filter
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${id}`);
        toast.success('Lead deleted successfully');
        fetchLeads();
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to delete lead');
      }
    }
  };

  const handleExportCsv = async () => {
    try {
      const params: Record<string, string> = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params[key] = value as string;
        }
      });
      const queryParams = new URLSearchParams(params);
      const res = await api.get(`/leads/export/csv?${queryParams.toString()}`, {
        responseType: 'blob',
      });
      

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  const openCreateModal = () => {
    setSelectedLead(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (lead: ILead) => {
    setSelectedLead(lead);
    setIsFormModalOpen(true);
  };

  const openViewModal = (lead: ILead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormModalOpen(false);
    fetchLeads();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.role === 'admin' ? 'Admin Dashboard' : 'Sales Dashboard'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and track your sales leads</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="secondary" onClick={handleExportCsv} className="flex-1 sm:flex-none">
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button onClick={openCreateModal} className="flex-1 sm:flex-none">
            <Plus size={16} className="mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <AdminAnalytics refreshTrigger={analyticsRefreshTrigger} />
      <SalesWelcomeBanner />

      <LeadFilters onFilterChange={handleFilterChange} />

      <div className="glass-panel overflow-hidden">
        {loading && leads.length === 0 ? (
          <TableSkeleton />
        ) : leads.length === 0 ? (
          <EmptyState 
            title="No leads found" 
            description="We couldn't find any leads matching your current filters. Try adjusting them or create a new lead."
            action={
              <Button onClick={openCreateModal} className="mt-4">
                <Plus size={16} className="mr-2" />
                Add First Lead
              </Button>
            }
          />
        ) : (
          <>
            <LeadTable leads={leads} onView={openViewModal} onEdit={openEditModal} onDelete={handleDelete} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)}
        title="Lead Details"
      >
        {selectedLead && <LeadDetails lead={selectedLead} />}
      </Modal>

      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)}
        title={selectedLead ? "Edit Lead" : "Add New Lead"}
      >
        <LeadForm 
          initialData={selectedLead} 
          onSuccess={handleFormSuccess} 
          onCancel={() => setIsFormModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};
