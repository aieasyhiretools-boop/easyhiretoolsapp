'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, DollarSign, Briefcase, Clock, Building, Filter, ChevronRight } from 'lucide-react'

const ALL_JOBS = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Tech Innovations Inc',
    location: 'San Francisco, CA',
    salary: '$120k – $160k',
    type: 'Full-time',
    posted: '2 days ago',
    industry: 'Technology',
    description: 'We are looking for an experienced React developer to build and maintain our flagship SaaS product. You will work with a modern stack including React 18, TypeScript, and GraphQL.',
    tags: ['React', 'TypeScript', 'GraphQL'],
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Creative Studios',
    location: 'New York, NY',
    salary: '$90k – $130k',
    type: 'Full-time',
    posted: '1 week ago',
    industry: 'Design',
    description: 'Join our design team and create beautiful, intuitive user experiences for millions of users. You will work closely with product managers and engineers.',
    tags: ['Figma', 'User Research', 'Prototyping'],
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$100k – $140k',
    type: 'Full-time',
    posted: '3 days ago',
    industry: 'Technology',
    description: 'Exciting opportunity to build scalable web applications from the ground up. Stack includes Node.js, React, and PostgreSQL.',
    tags: ['Node.js', 'React', 'PostgreSQL'],
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'Global Tech Corp',
    location: 'Austin, TX',
    salary: '$110k – $150k',
    type: 'Full-time',
    posted: '1 day ago',
    industry: 'Management',
    description: 'Lead product strategy and drive innovation for our enterprise software suite. You will own the product roadmap and work with engineering, design, and marketing.',
    tags: ['Product Strategy', 'Agile', 'Roadmapping'],
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudBase Solutions',
    location: 'Remote',
    salary: '$115k – $145k',
    type: 'Full-time',
    posted: '4 days ago',
    industry: 'Technology',
    description: 'Build and maintain our cloud infrastructure on AWS. You will work with Kubernetes, Terraform, and CI/CD pipelines to ensure high availability.',
    tags: ['AWS', 'Kubernetes', 'Terraform'],
  },
  {
    id: 6,
    title: 'Data Scientist',
    company: 'Insights Analytics',
    location: 'Chicago, IL',
    salary: '$105k – $140k',
    type: 'Full-time',
    posted: '5 days ago',
    industry: 'Technology',
    description: 'Develop machine learning models to extract business insights from large datasets. You will work with Python, TensorFlow, and Spark.',
    tags: ['Python', 'Machine Learning', 'TensorFlow'],
  },
  {
    id: 7,
    title: 'Marketing Manager',
    company: 'BrandGrowth Agency',
    location: 'Los Angeles, CA',
    salary: '$85k – $110k',
    type: 'Full-time',
    posted: '2 days ago',
    industry: 'Marketing',
    description: 'Lead our digital marketing strategy across SEO, paid media, content, and social. Drive brand awareness and qualified lead generation.',
    tags: ['SEO', 'Content Marketing', 'Analytics'],
  },
  {
    id: 8,
    title: 'Sales Executive',
    company: 'Enterprise Solutions Co',
    location: 'Dallas, TX',
    salary: '$80k – $120k + OTE',
    type: 'Full-time',
    posted: '6 days ago',
    industry: 'Sales',
    description: 'Drive new business development and close enterprise software deals. Manage the full sales cycle from prospecting to contract negotiation.',
    tags: ['B2B Sales', 'CRM', 'Negotiation'],
  },
  {
    id: 9,
    title: 'Financial Analyst',
    company: 'Capital Ventures',
    location: 'Boston, MA',
    salary: '$90k – $115k',
    type: 'Full-time',
    posted: '3 days ago',
    industry: 'Finance',
    description: 'Analyse financial data, prepare reports, and support investment decision-making. Work alongside senior analysts and portfolio managers.',
    tags: ['Financial Modelling', 'Excel', 'Tableau'],
  },
  {
    id: 10,
    title: 'Frontend Developer',
    company: 'WebCraft Studio',
    location: 'Seattle, WA',
    salary: '$95k – $125k',
    type: 'Full-time',
    posted: '1 day ago',
    industry: 'Technology',
    description: 'Build pixel-perfect, performant user interfaces using React and Next.js. You will work closely with our design team to bring Figma designs to life.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 11,
    title: 'HR Business Partner',
    company: 'PeopleFirst Corp',
    location: 'Denver, CO',
    salary: '$80k – $100k',
    type: 'Full-time',
    posted: '1 week ago',
    industry: 'HR',
    description: 'Partner with business leaders to align HR strategy with organisational goals. Lead talent acquisition, performance management, and employee development.',
    tags: ['Talent Acquisition', 'Employee Relations', 'HRIS'],
  },
  {
    id: 12,
    title: 'React Native Developer',
    company: 'MobileTech Labs',
    location: 'Remote',
    salary: '$100k – $135k',
    type: 'Contract',
    posted: '2 days ago',
    industry: 'Technology',
    description: 'Build cross-platform mobile applications using React Native. You will deliver high-quality iOS and Android apps for our growing user base.',
    tags: ['React Native', 'iOS', 'Android'],
  },
]

const INDUSTRIES = ['All', 'Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Management']
const JOB_TYPES = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Freelance']
const LOCATIONS = ['All Locations', 'Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Chicago, IL', 'Los Angeles, CA', 'Seattle, WA']

export default function BrowseJobs() {
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('All')
  const [jobType, setJobType] = useState('All Types')
  const [location, setLocation] = useState('All Locations')
  const [selected, setSelected] = useState<number | null>(null)

  const filtered = ALL_JOBS.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchIndustry = industry === 'All' || job.industry === industry
    const matchType = jobType === 'All Types' || job.type === jobType
    const matchLocation = location === 'All Locations' || job.location === location
    return matchSearch && matchIndustry && matchType && matchLocation
  })

  const selectedJob = ALL_JOBS.find(j => j.id === selected)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Browse Jobs</h1>
          <p className="text-primary-100 text-lg mb-8">Explore {ALL_JOBS.length}+ opportunities from top companies</p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-3 flex gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search job title, company, or skill..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-gray-900 focus:outline-none rounded-lg"
              />
            </div>
            <button className="px-6 py-2.5 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
            <Filter className="w-4 h-4" /> Filters:
          </div>
          <select value={industry} onChange={e => setIndustry(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 bg-white font-medium">
            {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
          </select>
          <select value={jobType} onChange={e => setJobType(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 bg-white font-medium">
            {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={location} onChange={e => setLocation(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 bg-white font-medium">
            {LOCATIONS.map(l => <option key={l}>{l}</option>)}
          </select>
          <span className="ml-auto text-sm text-gray-500 self-center font-semibold">
            {filtered.length} job{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Job List */}
          <div className="lg:col-span-3 space-y-3">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                <p className="text-gray-500 font-semibold text-lg">No jobs match your search.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters.</p>
              </div>
            ) : (
              filtered.map(job => (
                <div
                  key={job.id}
                  onClick={() => setSelected(job.id)}
                  className={`bg-white rounded-xl p-5 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                    selected === job.id ? 'border-primary-500' : 'border-transparent hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          job.type === 'Remote' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>{job.type}</span>
                        {job.location === 'Remote' && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Remote</span>}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <p className="text-primary-600 font-semibold text-sm mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.posted}</span>
                      </div>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {job.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 mt-1 flex-shrink-0 transition ${selected === job.id ? 'text-primary-500' : 'text-gray-300'}`} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Job Detail Panel */}
          <div className="lg:col-span-2">
            {selectedJob ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <div className="mb-4">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 mb-2 inline-block">{selectedJob.type}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                  <p className="text-primary-600 font-bold mt-1">{selectedJob.company}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Location</p>
                    <p className="font-semibold text-gray-800 text-sm mt-0.5">{selectedJob.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Salary</p>
                    <p className="font-semibold text-gray-800 text-sm mt-0.5">{selectedJob.salary}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Industry</p>
                    <p className="font-semibold text-gray-800 text-sm mt-0.5">{selectedJob.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Posted</p>
                    <p className="font-semibold text-gray-800 text-sm mt-0.5">{selectedJob.posted}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="font-bold text-gray-900 mb-2">About the Role</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedJob.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-2">Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-sm font-semibold">{tag}</span>
                    ))}
                  </div>
                </div>

                <Link href="/jobseeker/login"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl hover:from-primary-600 hover:to-primary-700 transition shadow-md">
                  Apply Now
                </Link>
                <p className="text-center text-xs text-gray-400 mt-2">Sign in required to apply</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center sticky top-24">
                <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-semibold">Select a job to view details</p>
                <p className="text-gray-400 text-sm mt-1">Click any listing on the left</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
