import { useState } from 'react';
import { X, ExternalLink, Trash2, Calendar, Ruler, Tag, Info } from 'lucide-react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onRemove: (productName: string) => void;
}

export function ProductDetailModal({ product, open, onClose, onRemove }: ProductDetailModalProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const formattedPrice = typeof product.price === 'number' 
    ? `$${product.price.toFixed(2)}` 
    : product.price;

  const handleRemove = () => {
    onRemove(product.product_name);
    setShowDeleteDialog(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="aspect-square bg-secondary">
              {!imageError ? (
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <span className="font-display text-4xl">{product.brand[0]}</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 space-y-5">
              <DialogHeader className="space-y-3">
                <Badge variant="outline" className="w-fit">{product.brand}</Badge>
                <DialogTitle className="font-display text-xl leading-snug">
                  {product.product_name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Price & Type */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-semibold">{formattedPrice}</span>
                  <Badge variant="secondary">{product.product_type}</Badge>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 py-4 border-y border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Ruler className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div 
                      className="w-4 h-4 rounded-full border border-border flex-shrink-0" 
                      style={{ backgroundColor: getColorCode(product.color) }}
                    />
                    <span className="text-muted-foreground">Color:</span>
                    <span className="font-medium capitalize">{product.color}</span>
                  </div>
                  {product.style_code && (
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Style:</span>
                      <span className="font-medium font-mono text-xs">{product.style_code}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Info className="w-4 h-4" />
                    Description
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.product_description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open(product.product_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Product
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from closet?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove "{product.product_name}" from your closet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function getColorCode(colorName: string): string {
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
