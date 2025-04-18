import React, { useState } from 'react';
import { Influencer } from '@/data/mockInfluencerData';
import FilterDialog, { FilterOptions } from './FilterDialog';
import TableHeader from './table/TableHeader';
import TableRow from './table/TableRow';
import FilterBar from './table/FilterBar';
import ActiveFilters from './table/ActiveFilters';
import DeleteConfirmationDialog from './table/DeleteConfirmationDialog';

export type DialogMode = 'add' | 'edit' | 'view';

interface InfluencerTableProps {
  influencers: Influencer[];
  onOpenAddDialog: () => void;
  onOpenViewDialog: (influencer: Influencer) => void;
  onOpenEditDialog: (influencer: Influencer) => void;
  onDeleteInfluencer?: (id: string) => void;
  onToggleStatus?: (id: string, newStatus: 'active' | 'inactive') => void;
}

const InfluencerTable: React.FC<InfluencerTableProps> = ({ 
  influencers, 
  onOpenAddDialog, 
  onOpenViewDialog, 
  onOpenEditDialog,
  onDeleteInfluencer,
  onToggleStatus
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [influencerToDelete, setInfluencerToDelete] = useState<Influencer | null>(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    sort: 'name',
    sortDirection: 'asc',
    minReferrals: null,
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
      setFilters({...filters, sortDirection: newDirection as 'asc' | 'desc'});
    } else {
      setSortField(field);
      setSortDirection('asc');
      setFilters({...filters, sort: field as any, sortDirection: 'asc'});
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const confirmDelete = (influencer: Influencer) => {
    setInfluencerToDelete(influencer);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (influencerToDelete && onDeleteInfluencer) {
      onDeleteInfluencer(influencerToDelete.id);
    }
    setDeleteDialogOpen(false);
    setInfluencerToDelete(null);
  };
  
  const handleToggleStatus = (influencer: Influencer) => {
    if (onToggleStatus) {
      const newStatus = influencer.status === 'active' ? 'inactive' : 'active';
      onToggleStatus(influencer.id, newStatus);
    }
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setSortField(newFilters.sort);
    setSortDirection(newFilters.sortDirection);
  };

  const openFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const filteredInfluencers = influencers.filter(
    (influencer) => {
      const matchesSearch = 
        influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        filters.status === 'all' || 
        influencer.status === filters.status;
      
      const matchesMinReferrals = 
        filters.minReferrals === null || 
        influencer.referrals >= filters.minReferrals;
      
      return matchesSearch && matchesStatus && matchesMinReferrals;
    }
  );

  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    let fieldA: any = a[filters.sort as keyof Influencer];
    let fieldB: any = b[filters.sort as keyof Influencer];
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      if (fieldA.includes('£') || fieldA.includes('%')) {
        fieldA = fieldA.replace(/[£%]/g, '');
        const numA = Number(fieldA);
        if (!isNaN(numA)) fieldA = numA;
      }
      
      if (fieldB.includes('£') || fieldB.includes('%')) {
        fieldB = fieldB.replace(/[£%]/g, '');
        const numB = Number(fieldB);
        if (!isNaN(numB)) fieldB = numB;
      }
    }
    
    if (fieldA < fieldB) return filters.sortDirection === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return filters.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const hasFiltersApplied = 
    filters.status !== 'all' || 
    filters.minReferrals !== null ||
    filters.sort !== 'name' ||
    filters.sortDirection !== 'asc';

  const activeFiltersCount = 
    (filters.status !== 'all' ? 1 : 0) + 
    (filters.minReferrals !== null ? 1 : 0) +
    (filters.sort !== 'name' || filters.sortDirection !== 'asc' ? 1 : 0);

  return (
    <div className="p-6 rounded-xl glass-card mb-8">
      <FilterBar 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOpenFilterDialog={openFilterDialog}
        hasFiltersApplied={hasFiltersApplied}
        activeFiltersCount={activeFiltersCount}
      />
      
      <ActiveFilters 
        filters={filters}
        hasFiltersApplied={hasFiltersApplied}
      />
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <tbody className="divide-y divide-gray-100">
            {sortedInfluencers.map((influencer) => (
              <TableRow 
                key={influencer.id}
                influencer={influencer}
                onView={onOpenViewDialog}
                onEdit={onOpenEditDialog}
                onToggleStatus={handleToggleStatus}
                onDelete={confirmDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredInfluencers.length === 0 && (
        <div className="text-center py-8 text-bwc-charcoal-light">
          No influencers found matching your search.
        </div>
      )}

      <FilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        onFilter={handleApplyFilters}
        currentFilters={filters}
      />

      <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        influencer={influencerToDelete}
        onConfirmDelete={handleDelete}
      />
    </div>
  );
};

export default InfluencerTable;
