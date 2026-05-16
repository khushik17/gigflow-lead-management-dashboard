import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Users, CheckCircle, XCircle, TrendingUp, Sparkles, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Spinner } from '../common/Spinner';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

interface ChartDataItem {
  name: string;
  value: number;
}

interface AnalyticsData {
  totalLeads: number;
  qualifiedLeads: number;
  lostLeads: number;
  newLeadsThisMonth: number;
  conversionRate: number;
  byStatus: ChartDataItem[];
  bySource: ChartDataItem[];
}

const COLORS = ['#60a5fa', '#a78bfa', '#2dd4bf', '#fb7185', '#fb923c', '#34d399'];

interface AdminAnalyticsProps {
  refreshTrigger?: number;
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ refreshTrigger = 0 }) => {
  const { user } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') return;

    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/leads/analytics');
        setData(res.data.data);
      } catch (error) {
        console.error('Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, refreshTrigger]);

  if (user?.role !== 'admin') return null;

  if (loading || !data) {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border mb-6">
        <Spinner size={32} />
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Leads',
      value: data.totalLeads.toLocaleString(),
      trend: `+${data.newLeadsThisMonth}`,
      trendIcon: ArrowUpRight,
      trendColor: 'text-emerald-500',
      icon: Users,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50 dark:bg-blue-500/10',
      cardBg: 'bg-gradient-to-br from-white to-blue-50/80 dark:from-dark-surface dark:to-dark-surface',
    },
    {
      title: 'Qualified',
      value: data.qualifiedLeads.toLocaleString(),
      trend: `${data.totalLeads > 0 ? Math.round((data.qualifiedLeads / data.totalLeads) * 100) : 0}%`,
      trendIcon: TrendingUp,
      trendColor: 'text-emerald-500',
      icon: CheckCircle,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
      cardBg: 'bg-gradient-to-br from-white to-emerald-50/80 dark:from-dark-surface dark:to-dark-surface',
    },
    {
      title: 'Conv. Rate',
      value: `${data.conversionRate}%`,
      trend: 'ratio',
      trendIcon: Minus,
      trendColor: 'text-gray-400',
      icon: TrendingUp,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50 dark:bg-purple-500/10',
      cardBg: 'bg-gradient-to-br from-white to-purple-50/80 dark:from-dark-surface dark:to-dark-surface',
    },
    {
      title: 'Lost',
      value: data.lostLeads.toLocaleString(),
      trend: 'Needs action',
      trendIcon: ArrowDownRight,
      trendColor: 'text-rose-500',
      icon: XCircle,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50 dark:bg-rose-500/10',
      cardBg: 'bg-gradient-to-br from-white to-rose-50/80 dark:from-dark-surface dark:to-dark-surface',
    },
  ];

  const totalStatus = data.byStatus.reduce((acc, curr) => acc + curr.value, 0);
  const statusChartData = data.byStatus.map(d => ({
    ...d,
    name: `${d.name} — ${totalStatus > 0 ? Math.round((d.value / totalStatus) * 100) : 0}%`
  }));

  const totalSource = data.bySource.reduce((acc, curr) => acc + curr.value, 0);
  const sourceChartData = data.bySource.map(d => ({
    ...d,
    name: `${d.name} — ${totalSource > 0 ? Math.round((d.value / totalSource) * 100) : 0}%`
  }));

  return (
    <div className="mb-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="text-primary-600 dark:text-primary-400" size={18} />
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">Admin Insights</h2>
      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className={`${card.cardBg} rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-200/60 dark:border-dark-border/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group cursor-default`}
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.title}</p>
              <div className={`p-2 rounded-xl ${card.iconBg}`}>
                <card.icon size={16} className={card.iconColor} />
              </div>
            </div>
            
            <div className="mt-2">
              <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{card.value}</h3>
              <div className="flex items-center mt-3 gap-1.5">
                <div className={`flex items-center gap-0.5 text-xs font-medium ${card.trendColor}`}>
                  <card.trendIcon size={12} />
                  <span>{card.trend}</span>
                </div>
                {card.title === 'Total Leads' && <span className="text-xs text-gray-400 dark:text-gray-500">this month</span>}
                {card.title === 'Qualified' && <span className="text-xs text-gray-400 dark:text-gray-500">of total</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {((data.bySource?.length || 0) > 0 || (data.byStatus?.length || 0) > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
          <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-200/60 dark:border-dark-border/50">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Leads by Status</h3>
            <div className="flex justify-center items-center h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 14px rgb(0,0,0,0.1)' }} 
                  />
                  <Legend verticalAlign="bottom" height={40} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: '500', color: '#64748b' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-200/60 dark:border-dark-border/50">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Leads by Source</h3>
            <div className="flex justify-center items-center h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 14px rgb(0,0,0,0.1)' }} 
                  />
                  <Legend verticalAlign="bottom" height={40} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: '500', color: '#64748b' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
