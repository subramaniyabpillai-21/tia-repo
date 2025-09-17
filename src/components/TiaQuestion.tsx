import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, HelpCircle, Upload, FileText } from 'lucide-react';
import { TaxInput } from '../types/tax';
import TiaCharacter from './TiaCharacter';
import { parseForm16PDF } from '../utils/pdfParser';

interface TiaQuestionProps {
  input: TaxInput;
  onSubmit: (value: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  currentValue?: any;
}

const TiaQuestion: React.FC<TiaQuestionProps> = ({
  input,
  onSubmit,
  onBack,
  canGoBack,
  currentValue
}) => {
  const [value, setValue] = useState(currentValue || '');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [fileProcessed, setFileProcessed] = useState(false);

  // Reset file processing state when input changes
  useEffect(() => {
    setIsProcessingFile(false);
    setFileProcessed(false);
  }, [input.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.required && !value) return;
    
    let processedValue = value;
    
    if (input.type === 'number') {
      processedValue = parseFloat(value) || 0;
    } else if (input.type === 'file' && value) {
      // Handle Form 16 file processing
      setIsProcessingFile(true);
      try {
        const files = value as FileList;
        const file = files[0];
        if (file) {
          const form16Data = await parseForm16PDF(file, '2024-2025'); // You might want to get this from context
          processedValue = form16Data;
          setFileProcessed(true);
        }
      } catch (error) {
        console.error('Error processing Form 16:', error);
        alert('Error processing Form 16. Please try again.');
        setIsProcessingFile(false);
        return;
      }
      setIsProcessingFile(false);
    }
    
    onSubmit(processedValue);
  };

  const getTiaMood = () => {
    if (isProcessingFile) return 'thinking';
    if (fileProcessed) return 'celebrating';
    if (showExplanation) return 'explaining';
    return 'happy';
  };

  const getTiaMessage = () => {
    if (isProcessingFile) return 'Processing your Form 16... 🔄';
    if (fileProcessed) return 'Great! Form 16 processed successfully! ✅';
    if (showExplanation) return 'Let me explain why this is important...';
    return input.label;
  };

  const renderInput = () => {
    switch (input.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg transition-colors"
            required={input.required}
          >
            <option value="">Select an option...</option>
            {input.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={input.placeholder || '0'}
              min={input.min}
              max={input.max}
              className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg transition-colors"
              required={input.required}
            />
          </div>
        );
      
      case 'file':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setValue(e.target.files)}
                className="hidden"
                id="file-upload"
                required={input.required}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700">Click to upload Form 16</p>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG files accepted</p>
                  </div>
                </div>
              </label>
            </div>
            
            {value && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      {(value as FileList).length} file(s) selected
                    </p>
                    <p className="text-xs text-green-600">
                      {Array.from(value as FileList).map(f => f.name).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {isProcessingFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <p className="text-sm font-medium text-blue-800">Processing Form 16...</p>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={input.placeholder}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg transition-colors"
            required={input.required}
          />
        );
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center min-h-[600px]">
      {/* TIA Character */}
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <TiaCharacter 
            mood={getTiaMood()}
            message={getTiaMessage()}
            showSpeechBubble={true}
          />
        </div>
        
        {/* Explanation toggle */}
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="text-sm font-medium">
            {showExplanation ? 'Hide explanation' : 'Why do I need this?'}
          </span>
        </button>
        
        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-sm animate-fadeIn">
            <p className="text-blue-800 text-sm leading-relaxed">
              {input.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl font-semibold text-gray-800 mb-4">
              {input.label}
              {input.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderInput()}
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={onBack}
              disabled={!canGoBack}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                canGoBack
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:shadow-md'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={(input.required && !value) || isProcessingFile}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all ${
                (!input.required || value) && !isProcessingFile
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isProcessingFile ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TiaQuestion;