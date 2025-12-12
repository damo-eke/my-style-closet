import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type SortOption = 'brand' | 'color' | 'type' | 'newest' | 'price';
type SortDirection = 'asc' | 'desc';

interface SortControlsProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSort: (option: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'brand', label: 'Brand' },
  { value: 'color', label: 'Color' },
  { value: 'type', label: 'Type' },
  { value: 'price', label: 'Price' },
];

export function SortControls({ sortBy, sortDirection, onSort }: SortControlsProps) {
  const currentSort = sortOptions.find(opt => opt.value === sortBy);
  const SortIcon = sortDirection === 'asc' ? ArrowUp : ArrowDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SortIcon className="w-4 h-4" />
          Sort by {currentSort?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-popover">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSort(option.value)}
            className={cn(
              "cursor-pointer",
              sortBy === option.value && "bg-secondary"
            )}
          >
            {option.label}
            {sortBy === option.value && (
              <SortIcon className="w-3 h-3 ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
