import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BrandStatsProps {
  brandCounts: Record<string, number>;
  totalProducts: number;
  onBrandClick: (brand: string) => void;
  selectedBrands: string[];
}

export function BrandStats({ brandCounts, totalProducts, onBrandClick, selectedBrands }: BrandStatsProps) {
  const sortedBrands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">By brand:</span>
      {sortedBrands.map(([brand, count]) => (
        <button
          key={brand}
          onClick={() => onBrandClick(brand)}
          className={cn(
            "transition-base",
          )}
        >
          <Badge
            variant={selectedBrands.includes(brand) ? "default" : "outline"}
            className={cn(
              "cursor-pointer hover:bg-primary hover:text-primary-foreground",
              selectedBrands.includes(brand) && "bg-primary text-primary-foreground"
            )}
          >
            {brand}
            <span className="ml-1.5 opacity-70">({count})</span>
          </Badge>
        </button>
      ))}
    </div>
  );
}
