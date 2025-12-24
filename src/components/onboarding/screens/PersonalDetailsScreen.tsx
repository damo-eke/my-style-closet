import { motion } from 'framer-motion';
import { User, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { PersonalDetails } from '@/pages/Onboarding';

interface PersonalDetailsScreenProps {
  onNext: () => void;
  onSkip: () => void;
  details: PersonalDetails;
  onUpdateDetails: (details: PersonalDetails) => void;
}

const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const SHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SHOE_SIZES = ['6', '7', '8', '9', '10', '11', '12', '13'];

// Gender-specific sizing options
const FEMALE_PANT_SIZES = ['22', '23', '24', '25', '26', '27', '28', '30', '32', '34', '36', '38', '40'];
const MALE_PANT_SIZES = ['28', '30', '32', '34', '36', '38', '40'];

const FEMALE_HEIGHTS = ["4'8\"", "4'9\"", "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\"", "6'3\""];
const MALE_HEIGHTS = ["5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\"", "6'3\""];

const FEMALE_WEIGHTS = ['100-120 lbs', '120-140 lbs', '140-160 lbs', '160-180 lbs', '180-200 lbs', '200-220 lbs', '220+ lbs'];
const MALE_WEIGHTS = ['120-140 lbs', '140-160 lbs', '160-180 lbs', '180-200 lbs', '200-220 lbs', '220+ lbs'];

const getSizeOptions = (gender: string | undefined) => {
  if (gender === 'Female') {
    return {
      pantSizes: FEMALE_PANT_SIZES,
      heights: FEMALE_HEIGHTS,
      weights: FEMALE_WEIGHTS,
    };
  } else if (gender === 'Male') {
    return {
      pantSizes: MALE_PANT_SIZES,
      heights: MALE_HEIGHTS,
      weights: MALE_WEIGHTS,
    };
  } else {
    // Non-binary or Prefer not to say - show all options
    return {
      pantSizes: [...new Set([...FEMALE_PANT_SIZES, ...MALE_PANT_SIZES])].sort((a, b) => parseInt(a) - parseInt(b)),
      heights: FEMALE_HEIGHTS, // Already includes all heights
      weights: FEMALE_WEIGHTS, // Already includes all weights
    };
  }
};

export function PersonalDetailsScreen({
  onNext,
  onSkip,
  details,
  onUpdateDetails,
}: PersonalDetailsScreenProps) {
  const sizeOptions = getSizeOptions(details.gender);
  
  const updateField = (field: keyof PersonalDetails, value: string) => {
    onUpdateDetails({ ...details, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col px-6 py-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onSkip}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-16 h-16 rounded-2xl bg-terracotta/10 flex items-center justify-center mb-6"
      >
        <User className="w-8 h-8 text-terracotta" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Tell us your sizes
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Optional, but helps with fit recommendations. You can always update this later.
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 space-y-5"
      >
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Gender</Label>
          <Select
            value={details.gender || ''}
            onValueChange={(value) => updateField('gender', value)}
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Shirt size</Label>
            <Select
              value={details.shirtSize || ''}
              onValueChange={(value) => updateField('shirtSize', value)}
            >
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {SHIRT_SIZES.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Pant size</Label>
            <Select
              value={details.pantSize || ''}
              onValueChange={(value) => updateField('pantSize', value)}
            >
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.pantSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Shoe size (US)</Label>
          <Select
            value={details.shoeSize || ''}
            onValueChange={(value) => updateField('shoeSize', value)}
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select shoe size" />
            </SelectTrigger>
            <SelectContent>
              {SHOE_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Height</Label>
            <Select
              value={details.height || ''}
              onValueChange={(value) => updateField('height', value)}
            >
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.heights.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Weight</Label>
            <Select
              value={details.weight || ''}
              onValueChange={(value) => updateField('weight', value)}
            >
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.weights.map((w) => (
                  <SelectItem key={w} value={w}>
                    {w}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Info note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-xs text-muted-foreground text-center"
      >
        🔒 This info stays private and can be edited in settings anytime.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-auto pt-8"
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full h-14 text-lg font-medium rounded-2xl"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}
