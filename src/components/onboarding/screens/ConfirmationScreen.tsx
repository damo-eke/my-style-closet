import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ScannedItem } from '@/pages/Onboarding';

interface ConfirmationScreenProps {
  selectedItems: ScannedItem[];
  onConfirm: () => void;
  onBack: () => void;
}

export function ConfirmationScreen({ selectedItems, onConfirm, onBack }: ConfirmationScreenProps) {
  const categoryCounts = selectedItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col px-6 py-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
      >
        <Sparkles className="w-8 h-8 text-primary" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Ready to build your closet?
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          These items will be added to your digital wardrobe.
        </p>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 p-6 rounded-2xl bg-card border border-border"
      >
        <div className="text-center mb-6">
          <span className="font-display text-4xl font-bold text-foreground">
            {selectedItems.length}
          </span>
          <p className="text-muted-foreground">items selected</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div
              key={category}
              className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
            >
              <span className="text-sm capitalize text-foreground">{category}</span>
              <span className="text-sm font-medium text-muted-foreground">{count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Preview thumbnails */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex items-center justify-center gap-2"
      >
        {selectedItems.slice(0, 5).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35 + index * 0.05 }}
            className="w-12 h-12 rounded-xl bg-muted overflow-hidden border-2 border-background shadow-soft"
            style={{ marginLeft: index > 0 ? -8 : 0 }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {selectedItems.length > 5 && (
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground">
            +{selectedItems.length - 5}
          </div>
        )}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-auto pt-8"
      >
        <Button
          onClick={onConfirm}
          size="lg"
          className="w-full h-14 text-lg font-medium rounded-2xl shadow-card hover:shadow-elevated transition-all"
        >
          Add to my closet
        </Button>
        <button
          onClick={onBack}
          className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Go back and edit
        </button>
      </motion.div>
    </motion.div>
  );
}
