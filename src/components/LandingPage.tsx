import React from 'react';
import { Calculator, Sparkles, ArrowRight } from 'lucide-react';
import TiaCharacter from './TiaCharacter';

interface LandingPageProps {
  onStartCalculation: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartCalculation }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg animate-pulse">
              <Calculator className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            TIA
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
            Tax Intelligent Assistant
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal AI assistant for accurate and effortless income tax calculations. 
            Let TIA guide you through every step with expert knowledge and friendly support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <TiaCharacter />
          </div>
          
          <div className="order-1 md:order-2 space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Sparkles className="h-6 w-6 text-yellow-500 mr-3" />
                Why Choose TIA?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Expert Guidance</h4>
                    <p className="text-gray-600">TIA explains every input and helps you understand tax implications</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Accurate Calculations</h4>
                    <p className="text-gray-600">Based on latest tax slabs and government regulations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Interactive Experience</h4>
                    <p className="text-gray-600">Friendly, step-by-step process that makes tax filing easy</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Comprehensive Dashboard</h4>
                    <p className="text-gray-600">Clear visualization of your tax breakdown and savings</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onStartCalculation}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 text-lg"
            >
              <span>Start Your Tax Calculation</span>
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Calculations</h3>
            <p className="text-gray-600 text-sm">Advanced algorithms ensure accurate tax computations</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">User Friendly</h3>
            <p className="text-gray-600 text-sm">Intuitive interface designed for everyone</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Step by Step</h3>
            <p className="text-gray-600 text-sm">Guided process with clear explanations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;