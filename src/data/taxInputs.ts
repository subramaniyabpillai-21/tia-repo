import { TaxInput } from '../types/tax';

export const getTaxInputs = (): TaxInput[] => [
  // Personal Information
  {
    id: 'age',
    label: 'What is your age?',
    type: 'number',
    required: true,
    category: 'personal',
    explanation: 'Your age determines if you qualify for senior citizen tax benefits and affects your tax slab rates. Senior citizens (60+ years) and super senior citizens (80+ years) get higher basic exemption limits.',
    placeholder: '34',
    min: 18,
    max: 100
  },
  {
    id: 'residentialStatus',
    label: 'What is your residential status?',
    type: 'select',
    required: true,
    category: 'personal',
    explanation: 'Tax rules differ for Resident, RNOR (Resident but Not Ordinarily Resident), and NRI (Non-Resident Indian). This affects which income is taxable in India.',
    options: ['Resident', 'RNOR (Resident but Not Ordinarily Resident)', 'NRI (Non-Resident Indian)']
  },
  {
    id: 'assessmentYear',
    label: 'Which Assessment Year are you calculating for?',
    type: 'select',
    required: true,
    category: 'personal',
    explanation: 'This specifies for which financial year your tax is being calculated. Each year has different tax slabs and rules.',
    options: ['2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021']
  },
  {
    id: 'taxRegime',
    label: 'Which Tax Regime do you want to choose?',
    type: 'select',
    required: true,
    category: 'personal',
    explanation: 'The government allows you to choose between the Old Regime (with deductions like 80C, 80D) and New Regime (lower tax rates but fewer deductions). Choose what works best for you.',
    options: ['Old Regime', 'New Regime']
  },

  // Form 16 Upload
  {
    id: 'form16Files',
    label: 'Please upload your Form 16 files',
    type: 'file',
    required: false,
    category: 'income',
    explanation: 'Form 16 is an official document from your employer showing your salary and tax deducted. Upload all Form 16s if you changed jobs during the year. TIA will automatically extract salary details, allowances, deductions, and TDS information.'
  },

  // Other Income Sources
  {
    id: 'savingsInterest',
    label: 'Total interest earned from all savings accounts',
    type: 'number',
    required: false,
    category: 'income',
    explanation: 'Interest earned from all savings accounts is taxable and must be reported as a total annual figure. Include interest from all your savings accounts across different banks.',
    placeholder: '3500'
  },
  {
    id: 'fdInterest',
    label: 'Interest earned from Fixed Deposits (FDs)',
    type: 'number',
    required: false,
    category: 'income',
    explanation: 'Fixed Deposit interest is taxable and should be included in your income. Banks deduct TDS if interest exceeds ₹40,000 (₹50,000 for senior citizens).',
    placeholder: '5500'
  },
  {
    id: 'rdInterest',
    label: 'Interest earned from Recurring Deposits (RDs)',
    type: 'number',
    required: false,
    category: 'income',
    explanation: 'Recurring Deposit interest is taxable and must be reported. This is usually a smaller amount but needs to be included for accurate calculation.',
    placeholder: '2000'
  },
  {
    id: 'postOfficeInterest',
    label: 'Interest from Post Office accounts',
    type: 'number',
    required: false,
    category: 'income',
    explanation: 'Interest from post office accounts may be taxable, depending on the type. Include interest from post office savings, FDs, NSC, KVP, and other schemes.',
    placeholder: '1200'
  },
  {
    id: 'capitalGains',
    label: 'Total Capital Gains (Net profit/loss)',
    type: 'number',
    required: false,
    category: 'income',
    explanation: 'Enter your total net profit or loss from selling shares, mutual funds, property, etc., after subtracting losses and expenses. Include both short-term and long-term gains.',
    placeholder: '30000'
  },
  {
    id: 'freelanceIncome',
    label: 'Income from freelancing or business',
    type: 'number',
    required: false,
    category: 'income',
    explanation: 'Any additional income from freelancing, consulting, part-time work, or business must be included for accurate tax calculation. This includes income from professional services.',
    placeholder: '15000'
  },
  {
    id: 'rentalIncome',
    label: 'Annual rental income from property',
    type: 'number',
    required: false,
    category: 'income',
    explanation: 'Income from letting out property is taxable under the "House Property" head. Enter the total annual rent received from all properties you own.',
    placeholder: '180000'
  },
  {
    id: 'rentalLoanInterest',
    label: 'Interest paid on rental property loans',
    type: 'number',
    required: false,
    category: 'income',
    explanation: 'Enter the total interest paid on property loans for rented properties, which can be deducted from rental income to reduce your tax liability.',
    placeholder: '60000'
  },
  {
    id: 'homeLoanInterest',
    label: 'Home loan interest (Self-occupied property)',
    type: 'number',
    required: false,
    category: 'deductions',
    explanation: 'Enter the total interest paid on your home loan for the year to claim the deduction. Under Old Regime, maximum deduction is ₹2,00,000 for self-occupied house.',
    placeholder: '200000'
  },

  // Tax Credits
  {
    id: 'tdsFromAIS',
    label: 'Total TDS as per Form 26AS/AIS',
    type: 'number',
    required: false,
    category: 'credits',
    explanation: 'Tax already deducted by banks, employers, or other sources (shown in Form 26AS/AIS) helps avoid paying tax twice. This will be adjusted against your final tax liability.',
    placeholder: '3500'
  },
  {
    id: 'advanceTaxPaid',
    label: 'Advance Tax or Self-Assessment Tax paid',
    type: 'number',
    required: false,
    category: 'credits',
    explanation: 'Any advance tax or self-assessment tax you have paid during the year should be credited to your account. This reduces your final tax payable.',
    placeholder: '10000'
  },

  // Deductions (Old Regime)
  {
    id: 'section80C',
    label: 'Section 80C investments (EPF, PPF, LIC, ELSS, etc.)',
    type: 'number',
    required: false,
    category: 'deductions',
    explanation: 'Investments like EPF, PPF, LIC premiums, ELSS mutual funds, tuition fees, NSC, home loan principal, etc. can be claimed for deduction up to ₹1,50,000 under Old Regime.',
    placeholder: '120000'
  },
  {
    id: 'section80CCD1B',
    label: 'Section 80CCD(1B) - Additional NPS contribution',
    type: 'number',
    required: false,
    category: 'deductions',
    explanation: 'Extra NPS contribution (up to ₹50,000) can be claimed under this section for additional tax benefit, over and above the 80C limit.',
    placeholder: '50000'
  },
  {
    id: 'section80CCD2',
    label: 'Section 80CCD(2) - Employer NPS contribution',
    type: 'number',
    required: false,
    category: 'deductions',
    explanation: "Your employer's contribution to your NPS is deductible and allowed in both tax regimes. This is usually 10% of basic salary for government employees.",
    placeholder: '38000'
  },
  {
    id: 'section80D',
    label: 'Section 80D - Health insurance premiums',
    type: 'number',
    required: false,
    category: 'deductions',
    explanation: 'Premiums paid for health insurance for yourself, spouse, children, and parents are deductible. Limits vary from ₹25,000 to ₹75,000 based on age and coverage.',
    placeholder: '25000'
  },
  {
    id: 'section80E',
    label: 'Section 80E - Education loan interest',
    type: 'number',
    required: false,
    category: 'deductions',
    explanation: 'Interest paid on education loans for higher studies (for self, spouse, children, or students for whom you are legal guardian) is deductible with no upper limit.',
    placeholder: '12000'
  },
  {
    id: 'section80G',
    label: 'Section 80G - Donations to eligible charities',
    type: 'number',
    required: false,
    category: 'deductions',
    explanation: 'Donations made to eligible charities and funds can be deducted from taxable income. Ensure the recipient has 80G registration and you have proper receipts.',
    placeholder: '5000'
  },
  {
    id: 'section80TTA',
    label: 'Section 80TTA - Savings bank interest deduction',
    type: 'number',
    required: false,
    category: 'deductions',
    explanation: 'Deduction for savings account interest up to ₹10,000 for non-senior citizens under Old Regime. This is different from the interest earned (which goes in income).',
    placeholder: '8000'
  },
  {
    id: 'section80TTB',
    label: 'Section 80TTB - Interest deduction for senior citizens',
    type: 'number',
    required: false,
    category: 'deductions',
    explanation: 'Deduction for savings and deposit interest up to ₹50,000 for senior citizens under Old Regime. This replaces 80TTA for senior citizens.',
    placeholder: '30000'
  }
];