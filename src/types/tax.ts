export interface TaxInput {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'file';
  required: boolean;
  explanation: string;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  category?: 'personal' | 'income' | 'deductions' | 'credits';
}

export interface TaxFormData {
  // Personal Information
  age: number;
  residentialStatus: string;
  assessmentYear: string;
  taxRegime: string;
  
  // Form 16 Data
  form16Files: FileList | null;
  grossSalary?: number;
  allowances?: number;
  standardDeduction?: number;
  tdsFromForm16?: number;
  
  // Other Income
  savingsInterest: number;
  fdInterest: number;
  rdInterest: number;
  postOfficeInterest: number;
  capitalGains: number;
  freelanceIncome: number;
  rentalIncome: number;
  rentalLoanInterest: number;
  homeLoanInterest: number;
  
  // Tax Credits
  tdsFromAIS: number;
  advanceTaxPaid: number;
  
  // Deductions (Old Regime)
  section80C: number;
  section80CCD1B: number;
  section80CCD2: number;
  section80D: number;
  section80E: number;
  section80G: number;
  section80TTA: number;
  section80TTB: number;
}

export interface TaxCalculation {
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxLiability: number;
  cess: number;
  totalTax: number;
  tdsCredits: number;
  advanceTaxCredits: number;
  refundDue: number;
  taxPayable: number;
  salaryIncome?: number;
  otherIncome?: number;
  housePropertyIncome?: number;
}

export interface TaxData {
  formData: TaxFormData;
  calculation: TaxCalculation;
  suggestions?: string[];
}

export interface RegimeComparison {
  oldRegime: TaxCalculation;
  newRegime: TaxCalculation;
  optimal: string;
  savings: number;
}