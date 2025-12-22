import { useState } from 'react';
import { Filter, LayoutGrid, Shirt } from 'lucide-react';
import { useCloset } from '@/hooks/useCloset';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/closet/ProductCard';
import { ProductDetailModal } from '@/components/closet/ProductDetailModal';
import { FilterSidebar } from '@/components/closet/FilterSidebar';
import { BrandStats } from '@/components/closet/BrandStats';
import { SortControls } from '@/components/closet/SortControls';
import { SearchBar } from '@/components/closet/SearchBar';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const {
    products, totalProducts, filters, availableFilters, brandCounts,
    sortBy, sortDirection, searchQuery, setSearchQuery,
    removeProduct, toggleFilter, clearFilters, toggleSort,
  } = useCloset();

  const { isOnboardingComplete, completeOnboarding } = useOnboarding();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeFilterCount = filters.brands.length + filters.colors.length + filters.productTypes.length;

  // Show nothing until we know onboarding state
  if (isOnboardingComplete === null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shirt className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-semibold text-foreground">My Closet</h1>
                <p className="text-sm text-muted-foreground">
                  {totalProducts} items{products.length !== totalProducts && ` · ${products.length} shown`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Filter className="w-4 h-4 mr-2" />Filters
                {activeFilterCount > 0 && <Badge className="ml-2">{activeFilterCount}</Badge>}
              </Button>
              <SortControls sortBy={sortBy} sortDirection={sortDirection} onSort={toggleSort} />
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      <div className="flex">
        <FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} availableFilters={availableFilters} activeFilters={filters} brandCounts={brandCounts} onToggleFilter={toggleFilter} onClearFilters={clearFilters} />
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="mb-6 hidden lg:block">
            <BrandStats brandCounts={brandCounts} totalProducts={totalProducts} onBrandClick={(brand) => toggleFilter('brands', brand)} selectedBrands={filters.brands} />
          </div>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 bg-secondary rounded-full mb-4"><LayoutGrid className="w-8 h-8 text-muted-foreground" /></div>
              <h3 className="font-display text-lg mb-2">No items found</h3>
              <p className="text-muted-foreground text-sm">Try adjusting your filters</p>
              <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">Clear filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product, index) => (
                <ProductCard key={`${product.product_name}-${index}`} product={product} onRemove={removeProduct} onSelect={setSelectedProduct} />
              ))}
            </div>
          )}
        </main>
      </div>
      <ProductDetailModal product={selectedProduct} open={!!selectedProduct} onClose={() => setSelectedProduct(null)} onRemove={removeProduct} />
      <OnboardingModal open={!isOnboardingComplete} onComplete={completeOnboarding} />
    </div>
  );
};

export default Index;
