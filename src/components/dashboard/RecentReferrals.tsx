
import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface Referral {
  id: string;
  date: string;
  bookingId: string;
  status: 'completed' | 'pending' | 'cancelled';
  amount: string;
}

interface RecentReferralsProps {
  referrals: Referral[];
}

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return (
        <div className="flex items-center text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-xs font-medium">
          <CheckCircle2 size={12} className="mr-1" />
          Completed
        </div>
      );
    case 'pending':
      return (
        <div className="flex items-center text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs font-medium">
          <Clock size={12} className="mr-1" />
          Pending
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full text-xs font-medium">
          <AlertCircle size={12} className="mr-1" />
          Cancelled
        </div>
      );
    default:
      return null;
  }
};

const RecentReferrals: React.FC<RecentReferralsProps> = ({ referrals }) => {
  return (
    <div className="p-6 rounded-xl glass-card">
      <h3 className="text-lg font-semibold text-bwc-charcoal mb-4">Recent Code Usage</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-bwc-charcoal-light uppercase tracking-wider">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {referrals.map((referral) => (
              <tr key={referral.id} className="hover:bg-bwc-cream/30 transition-colors">
                <td className="px-4 py-3 text-sm text-bwc-charcoal-light">
                  {referral.date}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={referral.status} />
                </td>
                <td className="px-4 py-3 text-right font-medium text-bwc-charcoal">
                  {referral.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {referrals.length === 0 && (
        <div className="text-center py-8 text-bwc-charcoal-light">
          No code usage yet. Share your link to start earning!
        </div>
      )}
    </div>
  );
};

export default RecentReferrals;
