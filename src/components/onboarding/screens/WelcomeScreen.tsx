import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNext: () => void;
  onLogin: () => void;
}

export function WelcomeScreen({ onNext, onLogin }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-12"
    >
      {/* Animated logo/icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-elevated">
          <Sparkles className="w-12 h-12 text-primary-foreground" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-terracotta flex items-center justify-center"
        >
          <span className="text-sm font-bold text-white">✨</span>
        </motion.div>
      </motion.div>

      {/* Welcome text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-sm"
      >
        <h1 className="font-display text-4xl font-semibold text-foreground mb-4">
          Your closet,
          <br />
          <span className="text-primary">digitized</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          We'll scan your email receipts to automatically build your wardrobe. No manual entry needed.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 w-full max-w-sm space-y-3"
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full h-14 text-lg font-medium rounded-2xl shadow-card hover:shadow-elevated transition-all"
        >
          Sign up with email
        </Button>
        <Button
          onClick={onLogin}
          variant="ghost"
          size="lg"
          className="w-full h-12 text-muted-foreground hover:text-foreground"
        >
          Already have an account? Log in
        </Button>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-accent/30 to-transparent pointer-events-none"
      />
    </motion.div>
  );
}
