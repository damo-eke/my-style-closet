import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Ban, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PermissionsScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const PERMISSIONS = [
  {
    icon: Eye,
    title: 'Read-only access',
    description: 'We can only view emails, never modify them',
    positive: true,
  },
  {
    icon: ShieldCheck,
    title: 'Order receipts only',
    description: 'We only look for clothing purchase confirmations',
    positive: true,
  },
  {
    icon: Lock,
    title: 'Data stays private',
    description: 'Your emails are never stored or shared',
    positive: true,
  },
  {
    icon: Ban,
    title: 'No spam, ever',
    description: 'We will never send emails on your behalf',
    positive: true,
  },
];

export function PermissionsScreen({ onNext, onBack }: PermissionsScreenProps) {
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
                  i <= 2 ? 'bg-primary' : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-16 h-16 rounded-2xl bg-sage/10 flex items-center justify-center mb-6"
      >
        <ShieldCheck className="w-8 h-8 text-sage" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Your privacy matters
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Here's exactly what we can and can't do with your email.
        </p>
      </motion.div>

      {/* Permission items */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 space-y-3"
      >
        {PERMISSIONS.map((permission, index) => (
          <motion.div
            key={permission.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.05 }}
            className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border"
          >
            <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center shrink-0">
              <permission.icon className="w-5 h-5 text-sage" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-0.5">{permission.title}</h3>
              <p className="text-sm text-muted-foreground">{permission.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-auto pt-8"
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full h-14 text-lg font-medium rounded-2xl"
        >
          I agree, continue
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-foreground">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
