import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shirt, Mail, Sparkles } from 'lucide-react';

interface ScanningScreenProps {
  onComplete: () => void;
}

const SCANNING_MESSAGES = [
  { text: 'Connecting to your inbox...', icon: Mail },
  { text: 'Finding clothing receipts...', icon: Shirt },
  { text: 'Extracting item details...', icon: Sparkles },
  { text: 'Almost done...', icon: Sparkles },
];

export function ScanningScreen({ onComplete }: ScanningScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, SCANNING_MESSAGES.length - 1));
    }, 1200);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Complete after animation
    const timeout = setTimeout(onComplete, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  const CurrentIcon = SCANNING_MESSAGES[messageIndex].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-12"
    >
      {/* Animated scanning icon */}
      <div className="relative mb-12">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-elevated"
        >
          <CurrentIcon className="w-12 h-12 text-primary-foreground" />
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-terracotta"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.4,
            }}
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: `${40 + i * 10}px 0`,
            }}
          />
        ))}
      </div>

      {/* Message */}
      <motion.div
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-8"
      >
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          {SCANNING_MESSAGES[messageIndex].text}
        </h2>
        <p className="text-muted-foreground">
          This usually takes a few seconds
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-terracotta rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-3">
          {progress}% complete
        </p>
      </div>

      {/* Fun fact */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-12 text-center text-sm text-muted-foreground max-w-xs"
      >
        💡 Did you know? The average person owns 148 pieces of clothing.
      </motion.p>
    </motion.div>
  );
}
