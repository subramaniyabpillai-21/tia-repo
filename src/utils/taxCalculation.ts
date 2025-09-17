import { TaxFormData, TaxCalculation } from '../types/tax';

interface TaxSlab {
  min: number;
  max: number;
  rate: number;
}

const OLD_REGIME_SLABS: TaxSlab[] = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250001, max: 500000, rate: 0.05 },
  { min: 500001, max: 1000000, rate: 0.20 },
  { min: 1000001, max: Infinity, rate: 0.30 }
];

const NEW_REGIME_SLABS: TaxSlab[] = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300001, max: 600000, rate: 0.05 },
  { min: 600001, max: 900000, rate: 0.10 },
  { min: 900001, max: 1200000, rate: 0.15 },
  { min: 1200001, max: 1500000, rate: 0.20 },
  { min: 1500001, max: Infinity, rate: 0.30 }
];

const getSlabTax = (income: number, slabs: TaxSlab[]): number => {
  let tax = 0;
  for (const slab of slabs) {
    if (income > slab.min) {
      const taxableInSlab = Math.min(slab.max, income) - slab.min;
      tax += taxableInSlab * slab.rate;
    }
  }
  return tax;
};

const calculateBasicExemption = (age: number): number => {
  if (age >= 80) return 500000; // Super senior citizen
  if (age >= 60) return 300000; // Senior citizen
  return 250000; // Regular
};

export const calculateTax = (formData: TaxFormData): TaxCalculation => {
  // Calculate salary income (from Form 16 data)
  const salaryIncome = (formData.grossSalary || 0) - (formData.allowances || 0) - (formData.standardDeduction || 0);
  
  // Calculate other income
  const otherIncome = 
    (formData.savingsInterest || 0) +
    (formData.fdInterest || 0) +
    (formData.rdInterest || 0) +
    (formData.postOfficeInterest || 0) +
    (formData.capitalGains || 0) +
    (formData.freelanceIncome || 0);

  // Calculate house property income
  let housePropertyIncome = 0;
  const rentalIncome = formData.rentalIncome || 0;
  if (rentalIncome > 0) {
    const netRental = rentalIncome * 0.7; // 30% standard deduction
    const rentalInterest = formData.rentalLoanInterest || 0;
    housePropertyIncome = netRental - rentalInterest;
    
    if (formData.taxRegime === 'Old Regime') {
      // Cap loss at 2L for old regime
      housePropertyIncome = Math.max(housePropertyIncome, -200000);
    } else {
      // No loss allowed in new regime
      housePropertyIncome = Math.max(housePropertyIncome, 0);
    }
  }

  // Calculate gross total income
  let grossTotalIncome = salaryIncome + otherIncome + housePropertyIncome;

  // Add home loan interest deduction for self-occupied property (Old Regime only)
  if (formData.taxRegime === 'Old Regime') {
    const homeLoanInterest = Math.min(formData.homeLoanInterest || 0, 200000);
    grossTotalIncome -= homeLoanInterest;
  }

  // Calculate total deductions
  let totalDeductions = 0;
  if (formData.taxRegime === 'Old Regime') {
    totalDeductions = 
      Math.min(formData.section80C || 0, 150000) +
      Math.min(formData.section80CCD1B || 0, 50000) +
      (formData.section80CCD2 || 0) +
      (formData.section80D || 0) +
      (formData.section80E || 0) +
      (formData.section80G || 0) +
      Math.min(formData.section80TTA || 0, 10000) +
      Math.min(formData.section80TTB || 0, 50000);
  } else {
    // New Regime - only employer NPS contribution allowed
    totalDeductions = formData.section80CCD2 || 0;
  }

  const taxableIncome = Math.max(0, grossTotalIncome - totalDeductions);

  // Calculate tax liability
  let taxLiability = 0;
  if (formData.taxRegime === 'Old Regime') {
    const basicExemption = calculateBasicExemption(formData.age);
    const taxableAfterExemption = Math.max(0, taxableIncome - basicExemption);
    taxLiability = getSlabTax(taxableAfterExemption, OLD_REGIME_SLABS);
  } else {
    taxLiability = getSlabTax(taxableIncome, NEW_REGIME_SLABS);
  }

  // Calculate cess (4% of income tax)
  const cess = taxLiability * 0.04;
  const totalTax = taxLiability + cess;

  // Credits
  const tdsCredits = (formData.tdsFromForm16 || 0) + (formData.tdsFromAIS || 0);
  const advanceTaxCredits = formData.advanceTaxPaid || 0;
  const totalCredits = tdsCredits + advanceTaxCredits;

  // Final calculation
  const netAmount = totalTax - totalCredits;
  const refundDue = netAmount < 0 ? Math.abs(netAmount) : 0;
  const taxPayable = netAmount > 0 ? netAmount : 0;

  return {
    totalIncome: grossTotalIncome,
    totalDeductions,
    taxableIncome,
    taxLiability,
    cess,
    totalTax,
    tdsCredits,
    advanceTaxCredits,
    refundDue,
    taxPayable,
    salaryIncome,
    otherIncome,
    housePropertyIncome
  };
};

export const compareRegimes = (oldRegimeData: TaxFormData, newRegimeData: TaxFormData) => {
  const oldResult = calculateTax({ ...oldRegimeData, taxRegime: 'Old Regime' });
  const newResult = calculateTax({ ...newRegimeData, taxRegime: 'New Regime' });
  
  const optimal = oldResult.totalTax < newResult.totalTax ? 'Old Regime' : 'New Regime';
  const savings = Math.abs(oldResult.totalTax - newResult.totalTax);
  
  return {
    oldRegime: oldResult,
    newRegime: newResult,
    optimal,
    savings
  };
};

export const generateTaxSuggestions = (formData: TaxFormData, calculation: TaxCalculation): string[] => {
  const suggestions: string[] = [];
  
  if (formData.taxRegime === 'Old Regime') {
    const used80C = formData.section80C || 0;
    if (used80C < 150000) {
      const remaining = 150000 - used80C;
      suggestions.push(`You can still invest ₹${remaining.toLocaleString()} under Section 80C to save tax.`);
    }
    
    if (!formData.section80CCD1B || formData.section80CCD1B === 0) {
      suggestions.push('Consider investing ₹50,000 in NPS under Section 80CCD(1B) for additional tax benefits.');
    }
    
    if (!formData.section80D || formData.section80D === 0) {
      suggestions.push('Buy health insurance to claim deduction under Section 80D (₹25,000 - ₹75,000).');
    }
  } else {
    if (calculation.totalDeductions > 300000) {
      suggestions.push('Your deductions exceed ₹3L. Consider checking Old Regime - it might save more tax.');
    }
  }
  
  if (calculation.refundDue > 0) {
    suggestions.push('You are due a refund. Consider adjusting TDS declarations to avoid blocking money.');
  } else if (calculation.taxPayable > 0) {
    suggestions.push('Pay additional tax before due date to avoid interest charges.');
  }
  
  return suggestions;
};