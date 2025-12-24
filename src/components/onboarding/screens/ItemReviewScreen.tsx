import { motion } from 'framer-motion';
import { ChevronLeft, Check, X, Shirt, Footprints, Watch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { ScannedItem } from '@/pages/Onboarding';

interface ItemReviewScreenProps {
  items: ScannedItem[];
  onToggleItem: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PantsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v3l-3 14h-3l-2-10-2 10H7L4 7V4z"/>
  </svg>
);

const CATEGORY_ICONS = {
  tops: Shirt,
  bottoms: PantsIcon,
  shoes: Footprints,
  accessories: Watch,
};

const CATEGORY_LABELS = {
  tops: 'Tops',
  bottoms: 'Bottoms',
  shoes: 'Shoes',
  accessories: 'Accessories',
};

export function ItemReviewScreen({ items, onToggleItem, onNext, onBack }: ItemReviewScreenProps) {
  const categories = ['tops', 'bottoms', 'shoes', 'accessories'] as const;
  const selectedCount = items.filter((item) => item.selected).length;

  const getItemsByCategory = (category: string) =>
    items.filter((item) => item.category === category);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col px-6 py-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Review your items
          </h2>
          <p className="text-sm text-muted-foreground">
            {selectedCount} of {items.length} selected
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <Tabs defaultValue="tops" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4 h-12 mb-4">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            const count = getItemsByCategory(cat).length;
            return (
              <TabsTrigger
                key={cat}
                value={cat}
                className="flex flex-col gap-0.5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{count}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="flex-1 overflow-auto -mx-6 px-6">
            <div className="grid grid-cols-2 gap-3">
              {getItemsByCategory(cat).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'relative rounded-2xl border-2 overflow-hidden transition-all',
                    item.selected
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card opacity-60'
                  )}
                >
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                  </div>
                  
                  {/* Toggle button */}
                  <button
                    onClick={() => onToggleItem(item.id)}
                    className={cn(
                      'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all',
                      item.selected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-destructive/80 text-destructive-foreground'
                    )}
                  >
                    {item.selected ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>

            {getItemsByCategory(cat).length === 0 && (
              <div className="flex-1 flex items-center justify-center py-12">
                <p className="text-muted-foreground text-center">
                  No {CATEGORY_LABELS[cat].toLowerCase()} found
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* CTA */}
      <div className="pt-6 border-t border-border mt-4">
        <Button
          onClick={onNext}
          size="lg"
          disabled={selectedCount === 0}
          className="w-full h-14 text-lg font-medium rounded-2xl"
        >
          Continue with {selectedCount} items
        </Button>
      </div>
    </motion.div>
  );
}
