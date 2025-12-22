import { motion } from 'framer-motion';
import { Package, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScanResultsScreenProps {
  itemCount: number;
  onNext: () => void;
}

export function ScanResultsScreen({ itemCount, onNext }: ScanResultsScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-12"
    >
      {/* Celebration animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative mb-8"
      >
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-sage to-sage/70 flex items-center justify-center shadow-elevated">
          <Package className="w-14 h-14 text-white" />
        </div>
        
        {/* Confetti dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, (i % 2 ? 1 : -1) * (20 + i * 10)],
              y: [0, -20 - i * 5],
            }}
            transition={{ 
              delay: 0.5 + i * 0.1,
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
            style={{
              backgroundColor: ['hsl(var(--terracotta))', 'hsl(var(--primary))', 'hsl(var(--sage))'][i % 3],
            }}
          />
        ))}
      </motion.div>

      {/* Count */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-6 h-6 text-terracotta" />
          <span className="font-display text-5xl font-bold text-foreground">
            {itemCount}
          </span>
          <Sparkles className="w-6 h-6 text-terracotta" />
        </motion.div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
          items found!
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
          We discovered these from your email receipts. Review them before adding to your closet.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 w-full max-w-sm"
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full h-14 text-lg font-medium rounded-2xl shadow-card hover:shadow-elevated transition-all"
        >
          Review items
        </Button>
      </motion.div>
    </motion.div>
  );
}
