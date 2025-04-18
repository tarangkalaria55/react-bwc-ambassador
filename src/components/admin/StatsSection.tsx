
import React from 'react';
import { Users, Gift } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

interface StatsSectionProps {
  influencerCount: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ influencerCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <StatCard
        title="Total Influencers"
        value={influencerCount.toString()}
        icon={<Users size={24} />}
        trend={{ value: 4, isPositive: true }}
      />
      <StatCard
        title="Total Referrals"
        value="642"
        icon={<Gift size={24} />}
        trend={{ value: 12, isPositive: true }}
        tooltip="Total number of referrals made through influencer codes"
      />
    </div>
  );
};

export default StatsSection;
