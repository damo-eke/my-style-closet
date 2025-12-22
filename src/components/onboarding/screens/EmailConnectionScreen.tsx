import { motion } from 'framer-motion';
import { Mail, Shield, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmailConnectionScreenProps {
  onNext: () => void;
  onBack: () => void;
  selectedProvider: string | null;
  onSelectProvider: (provider: string) => void;
}

const EMAIL_PROVIDERS = [
  { id: 'google', name: 'Google', icon: '🔵', color: 'hover:border-blue-400' },
  { id: 'yahoo', name: 'Yahoo', icon: '🟣', color: 'hover:border-purple-400' },
  { id: 'outlook', name: 'Outlook', icon: '🔷', color: 'hover:border-sky-400' },
  { id: 'apple', name: 'Apple', icon: '⚫', color: 'hover:border-gray-400' },
];

export function EmailConnectionScreen({
  onNext,
  onBack,
  selectedProvider,
  onSelectProvider,
}: EmailConnectionScreenProps) {
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
                  i === 0 ? 'bg-primary' : 'bg-muted'
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
        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
      >
        <Mail className="w-8 h-8 text-primary" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Connect your email
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We'll scan your inbox for clothing receipts to build your closet automatically.
        </p>
      </motion.div>

      {/* Provider buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 space-y-3"
      >
        {EMAIL_PROVIDERS.map((provider, index) => (
          <motion.button
            key={provider.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + index * 0.05 }}
            onClick={() => onSelectProvider(provider.id)}
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all',
              selectedProvider === provider.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:bg-secondary/50',
              provider.color
            )}
          >
            <span className="text-2xl">{provider.icon}</span>
            <span className="flex-1 text-left font-medium text-foreground">
              Continue with {provider.name}
            </span>
            {selectedProvider === provider.id && (
              <Check className="w-5 h-5 text-primary" />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Security note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-auto pt-8"
      >
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-sage/10">
          <Shield className="w-5 h-5 text-sage mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Read-only access.</span>{' '}
            We only scan for order confirmations. Your emails are never stored or shared.
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Button
          onClick={onNext}
          size="lg"
          disabled={!selectedProvider}
          className="w-full h-14 text-lg font-medium rounded-2xl"
        >
          Connect {selectedProvider ? EMAIL_PROVIDERS.find(p => p.id === selectedProvider)?.name : 'email'}
        </Button>
      </motion.div>
    </motion.div>
  );
}
