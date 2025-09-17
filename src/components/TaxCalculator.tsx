import React, { useState } from 'react';
import { TaxFormData, TaxData } from '../types/tax';
import { getTaxInputs } from '../data/taxInputs';
import { calculateTax } from '../utils/taxCalculation';
import TiaQuestion from './TiaQuestion';
import ProgressBar from './ProgressBar';

interface TaxCalculatorProps {
  onComplete: (data: TaxData) => void;
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({ onComplete }) => {
  const taxInputs = getTaxInputs();
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<TaxFormData>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentInput = taxInputs[currentInputIndex];
  const progress = ((currentInputIndex + 1) / taxInputs.length) * 100;

  const handleInputSubmit = (value: any) => {
    const updatedFormData = {
      ...formData,
      [currentInput.id]: value
    };
    
    setFormData(updatedFormData);
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentInputIndex < taxInputs.length - 1) {
        setCurrentInputIndex(currentInputIndex + 1);
      } else {
        // Calculate tax and complete
        const calculation = calculateTax(updatedFormData as TaxFormData);
        onComplete({
          formData: updatedFormData as TaxFormData,
          calculation
        });
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentInputIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentInputIndex(currentInputIndex - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <ProgressBar progress={progress} currentStep={currentInputIndex + 1} totalSteps={taxInputs.length} />
        
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          <TiaQuestion
            input={currentInput}
            onSubmit={handleInputSubmit}
            onBack={handleBack}
            canGoBack={currentInputIndex > 0}
            currentValue={formData[currentInput.id as keyof TaxFormData]}
          />
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;