// We are using "export const" which is a NAMED export.
// This requires curly braces {} when importing.
export const mockAggregateData = {
  budgetStatus: [
    { name: 'Complete Budget', value: 480 },
    { name: 'Incomplete Budget', value: 220 },
    { name: 'Missing Details', value: 150 }
  ],
  costByState: [
    { state: 'Manipur', cost: 450 },
    { state: 'Meghalaya', cost: 420 },
    { state: 'Tripura', cost: 380 },
    { state: 'Nagaland', cost: 350 },
    { state: 'Mizoram', cost: 310 },
    { state: 'Assam', cost: 280 }
  ],
  riskOverTime: [
    { month: 'Jan', HighRisk: 20, MediumRisk: 30, LowRisk: 50 },
    { month: 'Feb', HighRisk: 22, MediumRisk: 35, LowRisk: 55 },
    { month: 'Mar', HighRisk: 25, MediumRisk: 32, LowRisk: 60 },
    { month: 'Apr', HighRisk: 23, MediumRisk: 40, LowRisk: 65 },
    { month: 'May', HighRisk: 28, MediumRisk: 38, LowRisk: 70 },
    { month: 'Jun', HighRisk: 26, MediumRisk: 42, LowRisk: 75 }
  ]
};