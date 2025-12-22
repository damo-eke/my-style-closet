import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Search, Palette, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivationScreenProps {
  onComplete: () => void;
}

const NEXT_STEPS = [
  { icon: Search, label: 'Browse your wardrobe' },
  { icon: Palette, label: 'Create outfit combinations' },
  { icon: Calendar, label: 'Plan your week' },
];

export function ActivationScreen({ onComplete }: ActivationScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                y: -20,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                rotate: 0,
              }}
              animate={{
                opacity: 0,
                y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: [
                  'hsl(var(--primary))',
                  'hsl(var(--terracotta))',
                  'hsl(var(--sage))',
                  'hsl(var(--accent))',
                ][i % 4],
              }}
            />
          ))}
        </div>
      )}

      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative mb-8"
      >
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-sage to-sage/70 flex items-center justify-center shadow-elevated">
          <CheckCircle className="w-14 h-14 text-white" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-terracotta flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-10"
      >
        <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
          Your closet is ready!
        </h1>
        <p className="text-muted-foreground text-lg">
          Time to explore your digital wardrobe.
        </p>
      </motion.div>

      {/* Next steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm space-y-3 mb-10"
      >
        <p className="text-xs uppercase tracking-wider text-muted-foreground text-center mb-4">
          What you can do next
        </p>
        {NEXT_STEPS.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <step.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium text-foreground">{step.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-sm"
      >
        <Button
          onClick={onComplete}
          size="lg"
          className="w-full h-14 text-lg font-medium rounded-2xl shadow-card hover:shadow-elevated transition-all"
        >
          Enter my closet
        </Button>
      </motion.div>
    </motion.div>
  );
}
