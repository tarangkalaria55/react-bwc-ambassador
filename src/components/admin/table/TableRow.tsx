
import React from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Influencer } from '@/data/mockInfluencerData';
import { useIsMobile } from '@/hooks/use-mobile';

interface TableRowProps {
  influencer: Influencer;
  onView: (influencer: Influencer) => void;
  onEdit: (influencer: Influencer) => void;
  onToggleStatus: (influencer: Influencer) => void;
  onDelete: (influencer: Influencer) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  influencer,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <tr className="hover:bg-bwc-cream/30 transition-colors">
      <td className={`px-4 ${isMobile ? 'py-2' : 'py-4'}`}>
        <div 
          className="font-medium text-bwc-charcoal cursor-pointer hover:text-bwc-gold hover:underline"
          onClick={() => onView(influencer)}
        >
          {influencer.name}
        </div>
      </td>
      <td className={`px-4 ${isMobile ? 'py-2' : 'py-4'} font-medium text-bwc-charcoal`}>
        {influencer.referrals}
      </td>
      <td className={`px-4 ${isMobile ? 'py-2' : 'py-4'} font-medium text-bwc-charcoal`}>
        {influencer.codeUsage || 0}
      </td>
      <td className={`px-4 ${isMobile ? 'py-2' : 'py-4'} font-medium text-bwc-charcoal`}>
        {influencer.completedTreatments || 0}
      </td>
      <td className={`px-4 ${isMobile ? 'py-2' : 'py-4'} font-medium text-bwc-charcoal`}>
        {influencer.earnings}
      </td>
      <td className={`px-4 ${isMobile ? 'py-2' : 'py-4'}`}>
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
          influencer.status === 'active' 
            ? 'bg-green-50 text-green-600' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {influencer.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className={`px-4 ${isMobile ? 'py-2' : 'py-4'} font-medium text-bwc-charcoal`}>
        {influencer.conversionRate}
      </td>
      <td className={`px-4 ${isMobile ? 'py-2' : 'py-4'} text-right`}>
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "sm"}
          className="text-bwc-charcoal hover:text-bwc-charcoal-light hover:bg-bwc-cream/50"
          onClick={() => onEdit(influencer)}
        >
          <Edit size={14} className="mr-1" />
          Edit
        </Button>
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "sm"}
          className={`${
            influencer.status === 'active' ? 'text-amber-500 hover:text-amber-600' : 'text-green-500 hover:text-green-600'
          } hover:bg-bwc-cream/50`}
          onClick={() => onToggleStatus(influencer)}
        >
          {influencer.status === 'active' ? 'Pause' : 'Activate'}
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
