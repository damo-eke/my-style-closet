import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'closet-onboarding-completed';

export function useOnboarding() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    setIsOnboardingComplete(completed === 'true');
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOnboardingComplete(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    setIsOnboardingComplete(false);
    setCurrentStep(0);
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));
  const goToStep = (step: number) => setCurrentStep(step);

  return {
    isOnboardingComplete,
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    completeOnboarding,
    resetOnboarding,
  };
}
