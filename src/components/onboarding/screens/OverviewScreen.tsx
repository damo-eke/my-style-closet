import { motion } from 'framer-motion';
import { Search, Ruler, CheckCircle, ChevronLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OverviewScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const STEPS = [
  {
    icon: Search,
    title: 'Scan emails',
    description: 'Find your clothing purchases',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Ruler,
    title: 'Add sizing',
    description: 'Optional fit preferences',
    color: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: CheckCircle,
    title: 'Review items',
    description: 'Confirm your wardrobe',
    color: 'bg-sage/10 text-sage',
  },
];

export function OverviewScreen({ onNext, onBack }: OverviewScreenProps) {
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
        <div className="flex-1">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-1 flex-1 rounded-full transition-colors',
                  i <= 1 ? 'bg-primary' : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Here's what's next
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Three quick steps to build your digital closet.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 space-y-4"
      >
        {STEPS.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border"
          >
            <div className="relative">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', step.color)}>
                <step.icon className="w-6 h-6" />
              </div>
              <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {index + 1}
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-medium text-foreground mb-0.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Time estimate */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center justify-center gap-2 text-muted-foreground"
      >
        <Clock className="w-4 h-4" />
        <span className="text-sm">Takes about 1–2 minutes</span>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-auto pt-8"
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full h-14 text-lg font-medium rounded-2xl"
        >
          Let's go
        </Button>
      </motion.div>
    </motion.div>
  );
}
