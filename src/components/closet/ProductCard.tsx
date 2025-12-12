import { useState } from 'react';
import { Trash2, ExternalLink, X } from 'lucide-react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ProductCardProps {
  product: Product;
  onRemove: (productName: string) => void;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onRemove, onSelect }: ProductCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formattedPrice = typeof product.price === 'number' 
    ? `$${product.price.toFixed(2)}` 
    : product.price;

  return (
    <>
      <article 
        className="group relative bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-smooth cursor-pointer animate-fade-in"
        onClick={() => onSelect(product)}
      >
        {/* Image */}
        <div className="aspect-[3/4] bg-secondary overflow-hidden">
          {!imageError ? (
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="font-display text-lg">{product.brand[0]}</span>
            </div>
          )}
        </div>

        {/* Quick delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteDialog(true);
          }}
          className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive hover:text-destructive-foreground"
          aria-label="Remove from closet"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-4 space-y-2">
          <Badge variant="secondary" className="text-xs font-medium">
            {product.brand}
          </Badge>
          <h3 className="font-body font-medium text-sm leading-tight line-clamp-2 text-foreground">
            {product.product_name}
          </h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{product.size}</span>
            <span className="font-medium">{formattedPrice}</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full border border-border" 
              style={{ backgroundColor: getColorCode(product.color) }}
              title={product.color}
            />
            <span className="text-xs text-muted-foreground capitalize">{product.color}</span>
          </div>
        </div>
      </article>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from closet?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove "{product.product_name}" from your closet. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onRemove(product.product_name)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
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
