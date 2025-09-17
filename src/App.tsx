import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import TaxCalculator from './components/TaxCalculator';
import Dashboard from './components/Dashboard';
import { TaxData } from './types/tax';

function App() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'calculator' | 'dashboard'>('landing');
  const [taxData, setTaxData] = useState<TaxData | null>(null);

  const handleStartCalculation = () => {
    setCurrentStep('calculator');
  };

  const handleCalculationComplete = (data: TaxData) => {
    setTaxData(data);
    setCurrentStep('dashboard');
  };

  const handleBackToCalculator = () => {
    setCurrentStep('calculator');
  };

  const handleStartOver = () => {
    setCurrentStep('landing');
    setTaxData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentStep === 'landing' && (
        <LandingPage onStartCalculation={handleStartCalculation} />
      )}
      {currentStep === 'calculator' && (
        <TaxCalculator onComplete={handleCalculationComplete} />
      )}
      {currentStep === 'dashboard' && taxData && (
        <Dashboard 
          taxData={taxData} 
          onBackToCalculator={handleBackToCalculator}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}

export default App;