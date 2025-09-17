export interface Form16Data {
  grossSalary: number;
  allowances: number;
  deductions: number;
  tds: number;
  assessmentYear: string;
}

export const parseForm16PDF = async (file: File, assessmentYear: string): Promise<Form16Data> => {
  // For now, we'll simulate PDF parsing since pdf-parse requires Node.js backend
  // In a real implementation, this would be handled by a backend service
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Simulate parsing delay
      setTimeout(() => {
        // Mock data extraction - in real implementation, this would parse the PDF content
        const mockData: Form16Data = {
          grossSalary: 1200000,
          allowances: 50000,
          deductions: 50000,
          tds: 120000,
          assessmentYear
        };
        resolve(mockData);
      }, 2000);
    };
    reader.readAsText(file);
  });
};

export const cleanNumber = (val: any, defaultValue: number = 0): number => {
  if (!val) return defaultValue;
  const str = String(val).trim();
  const cleaned = str.replace(/[₹,Rs\.]/g, '').replace(/,/g, '');
  const match = cleaned.match(/([0-9]+(?:\.[0-9]+)?)/);
  if (!match) return defaultValue;
  try {
    return Math.round(parseFloat(match[1]));
  } catch {
    return defaultValue;
  }
};