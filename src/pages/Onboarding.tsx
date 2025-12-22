import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from '@/components/onboarding/screens/WelcomeScreen';
import { EmailConnectionScreen } from '@/components/onboarding/screens/EmailConnectionScreen';
import { OverviewScreen } from '@/components/onboarding/screens/OverviewScreen';
import { PermissionsScreen } from '@/components/onboarding/screens/PermissionsScreen';
import { ScanningScreen } from '@/components/onboarding/screens/ScanningScreen';
import { PersonalDetailsScreen } from '@/components/onboarding/screens/PersonalDetailsScreen';
import { ScanResultsScreen } from '@/components/onboarding/screens/ScanResultsScreen';
import { ItemReviewScreen } from '@/components/onboarding/screens/ItemReviewScreen';
import { ConfirmationScreen } from '@/components/onboarding/screens/ConfirmationScreen';
import { ActivationScreen } from '@/components/onboarding/screens/ActivationScreen';
import { useOnboarding } from '@/hooks/useOnboarding';

export type OnboardingStep = 
  | 'welcome'
  | 'email-connection'
  | 'overview'
  | 'permissions'
  | 'scanning'
  | 'personal-details'
  | 'scan-results'
  | 'item-review'
  | 'confirmation'
  | 'activation';

export interface ScannedItem {
  id: string;
  name: string;
  brand: string;
  category: 'tops' | 'bottoms' | 'shoes' | 'accessories';
  image: string;
  selected: boolean;
}

export interface PersonalDetails {
  shirtSize?: string;
  pantSize?: string;
  shoeSize?: string;
  height?: string;
  weight?: string;
  skinTone?: string;
}

const STEPS: OnboardingStep[] = [
  'welcome',
  'email-connection',
  'overview',
  'permissions',
  'scanning',
  'personal-details',
  'scan-results',
  'item-review',
  'confirmation',
  'activation',
];

// Mock scanned items for demo
const MOCK_SCANNED_ITEMS: ScannedItem[] = [
  { id: '1', name: 'Cotton Oxford Shirt', brand: 'J.Crew', category: 'tops', image: '/placeholder.svg', selected: true },
  { id: '2', name: 'Slim Fit Chinos', brand: 'Bonobos', category: 'bottoms', image: '/placeholder.svg', selected: true },
  { id: '3', name: 'Wool Sweater', brand: 'Everlane', category: 'tops', image: '/placeholder.svg', selected: true },
  { id: '4', name: 'Leather Sneakers', brand: 'Common Projects', category: 'shoes', image: '/placeholder.svg', selected: true },
  { id: '5', name: 'Denim Jacket', brand: 'Levi\'s', category: 'tops', image: '/placeholder.svg', selected: true },
  { id: '6', name: 'Canvas Belt', brand: 'Anderson\'s', category: 'accessories', image: '/placeholder.svg', selected: true },
  { id: '7', name: 'Running Shorts', brand: 'Nike', category: 'bottoms', image: '/placeholder.svg', selected: true },
  { id: '8', name: 'Suede Loafers', brand: 'Cole Haan', category: 'shoes', image: '/placeholder.svg', selected: true },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useOnboarding();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({});
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>(MOCK_SCANNED_ITEMS);

  const goToStep = (step: OnboardingStep) => setCurrentStep(step);
  
  const nextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const handleComplete = () => {
    completeOnboarding();
    navigate('/');
  };

  const toggleItem = (id: string) => {
    setScannedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectedItems = scannedItems.filter(item => item.selected);

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onNext={nextStep} onLogin={() => navigate('/')} />;
      case 'email-connection':
        return (
          <EmailConnectionScreen
            onNext={nextStep}
            onBack={prevStep}
            selectedProvider={selectedProvider}
            onSelectProvider={setSelectedProvider}
          />
        );
      case 'overview':
        return <OverviewScreen onNext={nextStep} onBack={prevStep} />;
      case 'permissions':
        return <PermissionsScreen onNext={nextStep} onBack={prevStep} />;
      case 'scanning':
        return <ScanningScreen onComplete={nextStep} />;
      case 'personal-details':
        return (
          <PersonalDetailsScreen
            onNext={nextStep}
            onSkip={nextStep}
            details={personalDetails}
            onUpdateDetails={setPersonalDetails}
          />
        );
      case 'scan-results':
        return (
          <ScanResultsScreen
            itemCount={scannedItems.length}
            onNext={nextStep}
          />
        );
      case 'item-review':
        return (
          <ItemReviewScreen
            items={scannedItems}
            onToggleItem={toggleItem}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationScreen
            selectedItems={selectedItems}
            onConfirm={nextStep}
            onBack={prevStep}
          />
        );
      case 'activation':
        return <ActivationScreen onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}
