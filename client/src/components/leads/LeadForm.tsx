import React, { useState, useEffect } from 'react';
import type { ILead } from '../../types';
import { LeadStatus, LeadSource } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import toast from 'react-hot-toast';
import api from '../../utils/api';

interface LeadFormProps {
  initialData?: ILead | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSuccess, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LeadStatus>(LeadStatus.New);
  const [source, setSource] = useState<LeadSource>(LeadSource.Website);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setStatus(initialData.status);
      setSource(initialData.source);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { name, email, status, source };
      
      if (initialData) {
        await api.put(`/leads/${initialData._id}`, payload);
        toast.success('Lead updated successfully');
      } else {
        await api.post('/leads', payload);
        toast.success('Lead created successfully');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Lead Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="e.g. Acme Corp"
      />
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="contact@acme.com"
      />
      
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
          className="input-field"
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          required
        >
          {Object.values(LeadStatus).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Source</label>
        <select
          className="input-field"
          value={source}
          onChange={(e) => setSource(e.target.value as LeadSource)}
          required
        >
          {Object.values(LeadSource).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-dark-border mt-6">
        <Button variant="secondary" type="button" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" isLoading={loading} className="flex-1">
          {initialData ? 'Update Lead' : 'Save Lead'}
        </Button>
      </div>
    </form>
  );
};
