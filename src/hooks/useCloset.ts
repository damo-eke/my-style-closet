import { useState, useMemo, useCallback } from 'react';
import { Product } from '@/types/product';
import productsData from '@/data/products.json';

export type SortOption = 'brand' | 'color' | 'type' | 'newest' | 'price';
export type SortDirection = 'asc' | 'desc';

interface FilterState {
  brands: string[];
  colors: string[];
  productTypes: string[];
}

export function useCloset() {
  const [products, setProducts] = useState<Product[]>(productsData as Product[]);
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    colors: [],
    productTypes: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('brand');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique values for filters
  const availableFilters = useMemo(() => {
    const brands = [...new Set(products.map(p => p.brand))].sort();
    const colors = [...new Set(products.map(p => p.color))].sort();
    const productTypes = [...new Set(products.map(p => p.product_type))].sort();
    return { brands, colors, productTypes };
  }, [products]);

  // Brand counts
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.product_name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.color.toLowerCase().includes(query) ||
        p.product_type.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.colors.length > 0) {
      result = result.filter(p => filters.colors.includes(p.color));
    }
    if (filters.productTypes.length > 0) {
      result = result.filter(p => filters.productTypes.includes(p.product_type));
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'brand':
          comparison = (a.brand || '').localeCompare(b.brand || '');
          break;
        case 'color':
          comparison = (a.color || '').localeCompare(b.color || '');
          break;
        case 'type':
          comparison = (a.product_type || '').localeCompare(b.product_type || '');
          break;
        case 'price':
          const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.]/g, '')) : (a.price || 0);
          const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.]/g, '')) : (b.price || 0);
          comparison = priceA - priceB;
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [products, filters, sortBy, sortDirection, searchQuery]);

  const removeProduct = useCallback((productName: string) => {
    setProducts(prev => prev.filter(p => p.product_name !== productName));
  }, []);

  const toggleFilter = useCallback((type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ brands: [], colors: [], productTypes: [] });
    setSearchQuery('');
  }, []);

  const toggleSort = useCallback((option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  }, [sortBy]);

  return {
    products: filteredProducts,
    totalProducts: products.length,
    filters,
    availableFilters,
    brandCounts,
    sortBy,
    sortDirection,
    searchQuery,
    setSearchQuery,
    removeProduct,
    toggleFilter,
    clearFilters,
    toggleSort,
  };
}
