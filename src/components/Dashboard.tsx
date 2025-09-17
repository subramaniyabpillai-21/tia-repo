import React, { useState } from 'react';
import { TaxData, RegimeComparison } from '../types/tax';
import { ArrowLeft, Download, RefreshCw, TrendingUp, TrendingDown, Minus, DollarSign, Calculator, PieChart, BarChart3, Lightbulb } from 'lucide-react';
import { compareRegimes, generateTaxSuggestions } from '../utils/taxCalculation';

interface DashboardProps {
  taxData: TaxData;
  onBackToCalculator: () => void;
  onStartOver: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ taxData, onBackToCalculator, onStartOver }) => {
  const { formData, calculation } = taxData;
  const [activeTab, setActiveTab] = useState<'summary' | 'breakdown' | 'comparison' | 'suggestions'>('summary');
  const [comparison, setComparison] = useState<RegimeComparison | null>(null);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRefundStatusIcon = () => {
    if (calculation.refundDue > 0) {
      return <TrendingUp className="h-6 w-6 text-green-500" />;
    } else if (calculation.taxPayable > 0) {
      return <TrendingDown className="h-6 w-6 text-red-500" />;
    }
    return <Minus className="h-6 w-6 text-gray-500" />;
  };

  const getRefundStatusText = () => {
    if (calculation.refundDue > 0) {
      return { text: 'Refund Due', color: 'text-green-600', bg: 'bg-green-50' };
    } else if (calculation.taxPayable > 0) {
      return { text: 'Tax Payable', color: 'text-red-600', bg: 'bg-red-50' };
    }
    return { text: 'No Tax/Refund', color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const handleCompareRegimes = () => {
    const otherRegime = formData.taxRegime === 'Old Regime' ? 'New Regime' : 'Old Regime';
    const comparisonData = compareRegimes(
      { ...formData, taxRegime: 'Old Regime' },
      { ...formData, taxRegime: 'New Regime' }
    );
    setComparison(comparisonData);
    setActiveTab('comparison');
  };

  const suggestions = generateTaxSuggestions(formData, calculation);
  const status = getRefundStatusText();

  const renderSummaryTab = () => (
    <div className="space-y-8">
      {/* Key Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Income</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(calculation.totalIncome)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Deductions</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(calculation.totalDeductions)}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Taxable Income</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(calculation.taxableIncome)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className={`${status.bg} rounded-xl shadow-lg p-6 border-l-4 ${calculation.refundDue > 0 ? 'border-green-500' : calculation.taxPayable > 0 ? 'border-red-500' : 'border-gray-500'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{status.text}</p>
              <p className={`text-2xl font-bold ${status.color}`}>
                {formatCurrency(Math.abs(calculation.refundDue > 0 ? calculation.refundDue : calculation.taxPayable))}
              </p>
            </div>
            {getRefundStatusIcon()}
          </div>
        </div>
      </div>

      {/* Income Breakdown Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <PieChart className="h-6 w-6 mr-3 text-blue-600" />
          Income Breakdown
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(calculation.salaryIncome || 0)}</div>
            <div className="text-sm text-gray-600">Salary Income</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(calculation.otherIncome || 0)}</div>
            <div className="text-sm text-gray-600">Other Income</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(calculation.housePropertyIncome || 0)}</div>
            <div className="text-sm text-gray-600">House Property</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBreakdownTab = () => (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Tax Calculation */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Tax Calculation Breakdown</h2>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Gross Total Income</span>
            <span className="font-semibold">{formatCurrency(calculation.totalIncome)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Total Deductions</span>
            <span className="font-semibold text-green-600">-{formatCurrency(calculation.totalDeductions)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Taxable Income</span>
            <span className="font-semibold">{formatCurrency(calculation.taxableIncome)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Income Tax</span>
            <span className="font-semibold">{formatCurrency(calculation.taxLiability)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Health & Education Cess (4%)</span>
            <span className="font-semibold">{formatCurrency(calculation.cess)}</span>
          </div>
          <div className="flex justify-between py-3 bg-gray-50 rounded-lg px-3 font-bold text-lg">
            <span>Total Tax Liability</span>
            <span>{formatCurrency(calculation.totalTax)}</span>
          </div>
        </div>
      </div>

      {/* Credits and Final Amount */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Tax Credits & Final Amount</h2>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Total Tax Liability</span>
            <span className="font-semibold">{formatCurrency(calculation.totalTax)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">TDS Credits</span>
            <span className="font-semibold text-blue-600">-{formatCurrency(calculation.tdsCredits)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Advance Tax Paid</span>
            <span className="font-semibold text-blue-600">-{formatCurrency(calculation.advanceTaxCredits)}</span>
          </div>
          
          {calculation.refundDue > 0 ? (
            <div className="flex justify-between py-3 bg-green-50 rounded-lg px-3 font-bold text-lg">
              <span className="text-green-800">Refund Due</span>
              <span className="text-green-600">{formatCurrency(calculation.refundDue)}</span>
            </div>
          ) : calculation.taxPayable > 0 ? (
            <div className="flex justify-between py-3 bg-red-50 rounded-lg px-3 font-bold text-lg">
              <span className="text-red-800">Tax Payable</span>
              <span className="text-red-600">{formatCurrency(calculation.taxPayable)}</span>
            </div>
          ) : (
            <div className="flex justify-between py-3 bg-gray-50 rounded-lg px-3 font-bold text-lg">
              <span className="text-gray-800">No Tax Due/Refund</span>
              <span className="text-gray-600">{formatCurrency(0)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderComparisonTab = () => (
    <div className="space-y-8">
      {!comparison ? (
        <div className="text-center py-12">
          <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-4">Compare Tax Regimes</h3>
          <p className="text-gray-500 mb-6">See which tax regime works better for you</p>
          <button
            onClick={handleCompareRegimes}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105"
          >
            Compare Regimes
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
              Regime Comparison
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-4">Old Regime</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Tax:</span>
                    <span className="font-semibold">{formatCurrency(comparison.oldRegime.totalTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Deductions:</span>
                    <span className="font-semibold">{formatCurrency(comparison.oldRegime.totalDeductions)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-4">New Regime</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-700">Total Tax:</span>
                    <span className="font-semibold">{formatCurrency(comparison.newRegime.totalTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Deductions:</span>
                    <span className="font-semibold">{formatCurrency(comparison.newRegime.totalDeductions)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 text-center">
              <h4 className="text-lg font-semibold text-purple-800 mb-2">Recommendation</h4>
              <p className="text-2xl font-bold text-purple-600 mb-2">{comparison.optimal}</p>
              <p className="text-purple-700">
                Saves you <span className="font-semibold">{formatCurrency(comparison.savings)}</span> in taxes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSuggestionsTab = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Lightbulb className="h-6 w-6 mr-3 text-yellow-500" />
        AI Tax Optimization Suggestions
      </h3>
      
      {suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-yellow-800 leading-relaxed">{suggestion}</p>
              </div>
            </div>
          ))}
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips:</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Keep all investment receipts and documents ready for ITR filing</li>
              <li>• Consider tax-saving investments before March 31st</li>
              <li>• Review and optimize your tax strategy annually</li>
              <li>• Consult a tax professional for complex situations</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Great Job!</h4>
          <p className="text-gray-600">Your tax planning looks optimized. No additional suggestions at this time.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Tax Calculation Results</h1>
              <p className="text-gray-600">Assessment Year: {formData.assessmentYear} | Tax Regime: {formData.taxRegime}</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button
                onClick={onBackToCalculator}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Calculator</span>
              </button>
              <button
                onClick={onStartOver}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Start Over</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'summary', label: 'Summary', icon: DollarSign },
              { id: 'breakdown', label: 'Breakdown', icon: Calculator },
              { id: 'comparison', label: 'Compare Regimes', icon: BarChart3 },
              { id: 'suggestions', label: 'AI Suggestions', icon: Lightbulb }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'summary' && renderSummaryTab()}
          {activeTab === 'breakdown' && renderBreakdownTab()}
          {activeTab === 'comparison' && renderComparisonTab()}
          {activeTab === 'suggestions' && renderSuggestionsTab()}
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Important Notes</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• This calculation is based on the information provided and current tax slabs.</li>
            <li>• Please verify all inputs and consult with a tax professional for complex situations.</li>
            <li>• Keep all supporting documents and receipts for tax deductions claimed.</li>
            <li>• File your ITR before the due date to avoid penalties and interest.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;