// We are using "export const" which is a NAMED export.
export const mockDprAnalysis = {
  id: 'DPR-2025-042',
  dpr_filename: 'Sikkim_Hydro_Project_Phase_II.pdf',
  rag_status: {
    completeness: { status: 'Green', details: 'All mandatory sections and documents are present.' },
    feasibility: { status: 'Amber', details: 'Timeline seems optimistic; may not account for monsoon season delays.' },
    compliance: { status: 'Red', details: 'Missing mandatory seismic resilience code (IS 1893) for Zone V.' }
  },
  metadata: [
    { field: 'Project Name', value: 'Sikkim Hydro Project Phase II' },
    { field: 'Project Type', value: 'Energy / Hydroelectric' },
    { field: 'Budget', value: '₹482 Crores' },
    { field: 'Timeline', value: '48 Months' },
    { field: 'Primary Vendor', value: 'Himalayan Power Corp.' },
    { field: 'Key Milestone', value: 'Turbine Procurement (Q1 2029)' }
  ],
  key_inconsistencies: [
    {
      id: 1,
      type: 'Financial',
      description: 'The total cost projected on the summary page (₹450 Cr) does not match the sum of itemized costs in Appendix B (₹482 Cr).'
    },
    {
      id: 3,
      type: 'Compliance',
      description: 'Fails to cite the mandatory seismic resilience code (IS 1893) for construction in a Zone V region.',
      recommendation: "Update section 7.4 to include IS 1893 compliance details and a certified structural engineer's report."
    }
  ],
  cross_project_insights: [
    "Vendor 'Himalayan Power Corp.' is also associated with 2 other projects showing 'Amber' feasibility.",
    "Budget allocation for steel is 18% higher than the regional average for similar 'Energy' projects.",
    "This project's timeline overlaps with 'Nagaland Road Improvement', potentially causing resource bottlenecks."
  ]
};