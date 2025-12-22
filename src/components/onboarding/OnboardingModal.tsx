import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Sparkles, Filter, LayoutGrid, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnboardingModalProps {
  open: boolean;
  onComplete: () => void;
}

const steps = [
  {
    icon: Shirt,
    title: 'Welcome to Your Closet',
    description: 'Organize and explore your wardrobe in one beautiful space. Track everything you own with ease.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Filter,
    title: 'Smart Filtering',
    description: 'Filter by brand, color, or type. Find exactly what you\'re looking for in seconds.',
    color: 'bg-sage/20 text-sage',
  },
  {
    icon: LayoutGrid,
    title: 'Visual Gallery',
    description: 'Browse your items in a clean, visual grid. Click any item to see full details.',
    color: 'bg-terracotta/20 text-terracotta',
  },
  {
    icon: Sparkles,
    title: 'You\'re All Set!',
    description: 'Start exploring your closet. We\'re excited to have you here.',
    color: 'bg-accent text-accent-foreground',
  },
];

export function OnboardingModal({ open, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const nextStep = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md p-0 gap-0 overflow-hidden border-border/50"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <button
          onClick={onComplete}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 bg-secondary/80 hover:bg-secondary transition-colors"
          aria-label="Skip onboarding"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="p-8 pt-12"
          >
            <div className="flex flex-col items-center text-center">
              <div className={cn('p-4 rounded-2xl mb-6', step.color)}>
                <step.icon className="w-10 h-10" />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-3 text-foreground">
                {step.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 pb-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentStep 
                  ? 'bg-primary w-6' 
                  : 'bg-muted hover:bg-muted-foreground/30'
              )}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-secondary/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            size="sm"
            onClick={nextStep}
            className="gap-1"
          >
            {isLastStep ? 'Get Started' : 'Next'}
            {!isLastStep && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
