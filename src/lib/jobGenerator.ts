// AI Job Generator — generates professional job postings from minimal input

interface JobGeneratorInput {
  jobTitle: string
  industry: string
  experienceLevel: string
  jobType: string
  skills: string
  companyDescription?: string
}

interface GeneratedJob {
  description: string
  requirements: string
  responsibilities: string
  benefits: string
  salaryRange: string
}

const EXPERIENCE_MAP: Record<string, string> = {
  entry: 'Entry Level (0–2 years)',
  mid: 'Mid Level (3–5 years)',
  senior: 'Senior Level (5–8 years)',
  lead: 'Lead / Principal (8+ years)',
  executive: 'Executive / Director',
}

const SALARY_MAP: Record<string, Record<string, string>> = {
  entry: {
    tech: '$55,000 – $75,000',
    design: '$50,000 – $68,000',
    marketing: '$45,000 – $60,000',
    sales: '$40,000 – $60,000 + commission',
    finance: '$55,000 – $70,000',
    hr: '$48,000 – $62,000',
    default: '$45,000 – $65,000',
  },
  mid: {
    tech: '$90,000 – $120,000',
    design: '$75,000 – $100,000',
    marketing: '$70,000 – $95,000',
    sales: '$70,000 – $100,000 + commission',
    finance: '$80,000 – $110,000',
    hr: '$65,000 – $85,000',
    default: '$70,000 – $95,000',
  },
  senior: {
    tech: '$130,000 – $170,000',
    design: '$110,000 – $140,000',
    marketing: '$100,000 – $135,000',
    sales: '$100,000 – $150,000 + commission',
    finance: '$120,000 – $160,000',
    hr: '$90,000 – $120,000',
    default: '$100,000 – $140,000',
  },
  lead: {
    tech: '$170,000 – $220,000',
    design: '$140,000 – $180,000',
    marketing: '$130,000 – $165,000',
    sales: '$140,000 – $200,000 + commission',
    finance: '$160,000 – $210,000',
    hr: '$120,000 – $155,000',
    default: '$140,000 – $185,000',
  },
  executive: {
    default: '$200,000 – $300,000+',
  },
}

function getSalary(exp: string, industry: string): string {
  const expMap = SALARY_MAP[exp] || SALARY_MAP['mid']
  return expMap[industry] || expMap['default']
}

const RESPONSIBILITIES: Record<string, string[]> = {
  tech: [
    'Design, develop, and maintain scalable software applications',
    'Collaborate with product managers and designers to translate requirements into technical solutions',
    'Write clean, efficient, and well-documented code following best practices',
    'Participate in code reviews to maintain code quality and consistency',
    'Troubleshoot, debug, and resolve technical issues across the stack',
    'Contribute to architectural decisions and technical roadmap planning',
    'Mentor junior developers and provide technical guidance',
    'Stay current with emerging technologies and industry trends',
  ],
  design: [
    'Create intuitive and visually compelling user interfaces and experiences',
    'Conduct user research, usability testing, and synthesise findings',
    'Develop wireframes, prototypes, and high-fidelity mockups',
    'Maintain and evolve the product design system and component library',
    'Collaborate closely with engineering to ensure pixel-perfect implementation',
    'Champion accessibility and inclusive design principles',
    'Present design concepts and rationale to stakeholders',
    'Iterate rapidly based on user feedback and data insights',
  ],
  marketing: [
    'Develop and execute integrated marketing campaigns across multiple channels',
    'Create compelling content for digital, social, and print media',
    'Analyse campaign performance metrics and optimise for ROI',
    'Collaborate with sales teams to generate and nurture leads',
    'Conduct market research and competitive analysis',
    'Manage relationships with external agencies and vendors',
    'Develop brand messaging and ensure consistency across all touchpoints',
    'Report on marketing KPIs to senior leadership',
  ],
  sales: [
    'Identify, qualify, and close new business opportunities',
    'Build and maintain strong client relationships to ensure customer satisfaction',
    'Develop and deliver compelling sales presentations and proposals',
    'Manage and forecast a robust sales pipeline using CRM tools',
    'Negotiate contracts and pricing to close deals profitably',
    'Collaborate with marketing on lead generation initiatives',
    'Exceed quarterly and annual sales targets',
    'Provide market feedback to product and leadership teams',
  ],
  finance: [
    'Prepare and analyse financial statements, reports, and forecasts',
    'Support budgeting, financial planning, and variance analysis',
    'Ensure compliance with accounting standards and internal controls',
    'Collaborate with business units on financial modelling and decision support',
    'Coordinate audits and liaise with external auditors',
    'Identify opportunities to improve financial processes and efficiency',
    'Present financial insights to senior management',
    'Monitor cash flow and manage working capital',
  ],
  hr: [
    'Lead full-cycle recruitment for a variety of roles across the organisation',
    'Develop and implement HR policies, programmes, and initiatives',
    'Support employee onboarding, training, and development programmes',
    'Manage employee relations and resolve workplace issues',
    'Maintain HR systems and ensure data accuracy',
    'Drive employee engagement and retention strategies',
    'Ensure compliance with employment law and company policies',
    'Partner with management on workforce planning and talent strategy',
  ],
  default: [
    'Manage day-to-day responsibilities and deliver high-quality outcomes',
    'Collaborate effectively with cross-functional teams and stakeholders',
    'Identify process improvements and implement solutions',
    'Prepare reports and present findings to management',
    'Contribute to strategic planning and goal setting',
    'Mentor and support team members as required',
  ],
}

const REQUIREMENTS_BY_LEVEL: Record<string, string[]> = {
  entry: [
    "Bachelor's degree in a relevant field or equivalent practical experience",
    'Strong eagerness to learn and grow in a fast-paced environment',
    'Excellent communication and collaboration skills',
    'Basic proficiency in relevant tools and technologies',
    'Ability to manage time effectively and meet deadlines',
  ],
  mid: [
    "Bachelor's degree in a relevant field or 3+ years of equivalent experience",
    'Proven track record of delivering results independently',
    'Strong problem-solving and analytical skills',
    'Experience working in cross-functional team environments',
    'Excellent written and verbal communication skills',
  ],
  senior: [
    "Bachelor's or Master's degree in a relevant field or equivalent experience",
    '5+ years of progressive experience in a similar role',
    'Demonstrated ability to lead projects and mentor junior team members',
    'Strong strategic thinking and decision-making skills',
    'Experience working with senior stakeholders and driving alignment',
    'Proven ability to deliver results in a fast-paced environment',
  ],
  lead: [
    '8+ years of experience in a relevant domain',
    'Demonstrated technical or functional leadership experience',
    'Strong executive presence and stakeholder management skills',
    'Experience defining strategy, roadmaps, and OKRs',
    'Track record of building and scaling high-performing teams',
    "Bachelor's or advanced degree preferred",
  ],
  executive: [
    '10+ years of leadership experience in a relevant industry',
    'Proven P&L management and organisational leadership',
    'Strong board-level communication and reporting skills',
    'Experience driving company-wide strategic initiatives',
    'Advanced degree (MBA or equivalent) preferred',
  ],
}

const BENEFITS = [
  'Competitive salary and performance-based bonus',
  'Comprehensive health, dental, and vision insurance',
  '401(k) with company matching',
  'Flexible working hours and remote/hybrid options',
  'Generous paid time off and public holidays',
  'Professional development budget and learning opportunities',
  'Equity/stock options (where applicable)',
  'Modern office with free meals and snacks',
  'Parental leave and family support programmes',
  'Wellness stipend and mental health support',
]

export function generateJobPosting(input: JobGeneratorInput): GeneratedJob {
  const { jobTitle, industry, experienceLevel, jobType, skills, companyDescription } = input
  const expLabel = EXPERIENCE_MAP[experienceLevel] || 'Experienced'
  const skillList = skills.split(',').map(s => s.trim()).filter(Boolean)
  const industryKey = industry.toLowerCase() as keyof typeof RESPONSIBILITIES

  // Description
  const companyIntro = companyDescription
    ? companyDescription.trim()
    : `We are a dynamic and growing organisation committed to innovation and excellence.`

  const description = `${companyIntro}

We are seeking a talented and motivated ${jobTitle} to join our team on a ${jobType} basis. This is a ${expLabel} role ideal for a professional who is passionate about delivering exceptional results and contributing to a collaborative, high-performance culture.

As a ${jobTitle}, you will work alongside a talented team of professionals to drive meaningful impact. You will have the opportunity to grow your career while working on challenging projects that make a real difference.

${skillList.length > 0 ? `Key technologies and skills for this role include: ${skillList.join(', ')}.` : ''}`

  // Responsibilities (pick 6 relevant ones)
  const respArray = RESPONSIBILITIES[industryKey] || RESPONSIBILITIES['default']
  const responsibilities = respArray.slice(0, 6).join('\n')

  // Requirements
  const baseReqs = REQUIREMENTS_BY_LEVEL[experienceLevel] || REQUIREMENTS_BY_LEVEL['mid']
  const skillReqs = skillList.length > 0
    ? [`Proficiency in: ${skillList.join(', ')}`]
    : []
  const requirements = [...skillReqs, ...baseReqs].join('\n')

  // Benefits (pick 6)
  const benefits = BENEFITS.slice(0, 6).join('\n')

  // Salary
  const salaryRange = getSalary(experienceLevel, industryKey)

  return { description, requirements, responsibilities, benefits, salaryRange }
}
