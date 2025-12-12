import { X, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  availableFilters: {
    brands: string[];
    colors: string[];
    productTypes: string[];
  };
  activeFilters: {
    brands: string[];
    colors: string[];
    productTypes: string[];
  };
  brandCounts: Record<string, number>;
  onToggleFilter: (type: 'brands' | 'colors' | 'productTypes', value: string) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  isOpen,
  onClose,
  availableFilters,
  activeFilters,
  brandCounts,
  onToggleFilter,
  onClearFilters,
}: FilterSidebarProps) {
  const activeFilterCount = 
    activeFilters.brands.length + 
    activeFilters.colors.length + 
    activeFilters.productTypes.length;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen lg:h-auto w-80 bg-card border-r border-border transition-smooth",
          "lg:translate-x-0 lg:w-64 lg:flex-shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h2 className="font-display text-lg">Filters</h2>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-secondary rounded transition-base"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Clear all button */}
          {activeFilterCount > 0 && (
            <div className="p-4 border-b border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                Clear all filters
              </Button>
            </div>
          )}

          {/* Filters */}
          <ScrollArea className="flex-1 px-4 py-2">
            {/* Brands */}
            <FilterSection
              title="Brand"
              items={availableFilters.brands}
              activeItems={activeFilters.brands}
              onToggle={(value) => onToggleFilter('brands', value)}
              counts={brandCounts}
            />

            {/* Product Types */}
            <FilterSection
              title="Type"
              items={availableFilters.productTypes}
              activeItems={activeFilters.productTypes}
              onToggle={(value) => onToggleFilter('productTypes', value)}
            />

            {/* Colors */}
            <FilterSection
              title="Color"
              items={availableFilters.colors}
              activeItems={activeFilters.colors}
              onToggle={(value) => onToggleFilter('colors', value)}
              isColor
            />
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}

interface FilterSectionProps {
  title: string;
  items: string[];
  activeItems: string[];
  onToggle: (value: string) => void;
  counts?: Record<string, number>;
  isColor?: boolean;
}

function FilterSection({ title, items, activeItems, onToggle, counts, isColor }: FilterSectionProps) {
  return (
    <Collapsible defaultOpen className="py-3 border-b border-border last:border-0">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium hover:text-foreground/80 transition-base">
        <span>{title}</span>
        <ChevronDown className="w-4 h-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-1">
        {items.filter(item => item != null).map((item) => (
          <label
            key={item}
            className="flex items-center gap-3 py-1.5 px-2 rounded cursor-pointer hover:bg-secondary transition-base"
          >
            <Checkbox
              checked={activeItems.includes(item)}
              onCheckedChange={() => onToggle(item)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            {isColor && (
              <div 
                className="w-4 h-4 rounded-full border border-border flex-shrink-0" 
                style={{ backgroundColor: getColorCode(item) }}
              />
            )}
            <span className="flex-1 text-sm capitalize truncate">{item}</span>
            {counts && counts[item] && (
              <span className="text-xs text-muted-foreground">({counts[item]})</span>
            )}
          </label>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function getColorCode(colorName: string | null): string {
  if (!colorName) return '#9ca3af';
  const colors: Record<string, string> = {
    'black': '#1a1a1a',
    'white': '#ffffff',
    'navy': '#1e3a5f',
    'true navy': '#1e3a5f',
    'blue': '#3b82f6',
    'summer blue': '#60a5fa',
    'light blue': '#93c5fd',
    'red': '#ef4444',
    'pink': '#ec4899',
    'green': '#22c55e',
    'olive': '#84cc16',
    'gray': '#6b7280',
    'grey': '#6b7280',
    'charcoal': '#374151',
    'brown': '#92400e',
    'tan': '#d4a574',
    'khaki': '#c4b7a6',
    'beige': '#e8dcc4',
    'cream': '#f5f0e8',
    'veil': '#f5f0e8',
    'off white': '#faf5f0',
    'bone': '#e3dac9',
  };
  return colors[colorName.toLowerCase()] || '#9ca3af';
}
