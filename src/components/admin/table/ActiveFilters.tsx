
import React from 'react';
import { FilterOptions } from '../FilterDialog';

interface ActiveFiltersProps {
  filters: FilterOptions;
  hasFiltersApplied: boolean;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  hasFiltersApplied,
}) => {
  if (!hasFiltersApplied) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.status !== 'all' && (
        <div className="px-3 py-1 bg-bwc-cream rounded-full text-xs flex items-center">
          Status: {filters.status === 'active' ? 'Active' : 'Inactive'}
        </div>
      )}
      {filters.minReferrals !== null && (
        <div className="px-3 py-1 bg-bwc-cream rounded-full text-xs flex items-center">
          Min Referrals: {filters.minReferrals}
        </div>
      )}
      {(filters.sort !== 'name' || filters.sortDirection !== 'asc') && (
        <div className="px-3 py-1 bg-bwc-cream rounded-full text-xs flex items-center">
          Sort: {filters.sort} ({filters.sortDirection === 'asc' ? '↑' : '↓'})
        </div>
      )}
    </div>
  );
};

export default ActiveFilters;
