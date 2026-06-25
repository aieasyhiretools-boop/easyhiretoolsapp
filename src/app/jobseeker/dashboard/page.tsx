'use client'

import { useState } from 'react'
import { Search, MapPin, DollarSign, Briefcase, Clock } from 'lucide-react'

const SAMPLE_JOBS = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Tech Innovations Inc',
    location: 'San Francisco, CA',
    salary: '$120k - $160k',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'We are looking for an experienced React developer...',
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Creative Studios',
    location: 'New York, NY',
    salary: '$90k - $130k',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'Join our design team and create amazing user experiences...',
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$100k - $140k',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Exciting opportunity to build scalable web applications...',
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'Global Tech Corp',
    location: 'Austin, TX',
    salary: '$110k - $150k',
    type: 'Full-time',
    posted: '1 day ago',
    description: 'Lead product strategy and drive innovation...',
  },
]

export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    jobType: 'all',
    location: 'all',
  })

  const filteredJobs = SAMPLE_JOBS.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filters.jobType === 'all' || job.type === filters.jobType
    const matchesLocation = filters.location === 'all' || job.location === filters.location
    return matchesSearch && matchesType && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Perfect Job</h1>
          <p className="text-gray-600 text-lg">Browse thousands of opportunities from top companies</p>
        </div>

        {/* Search Bar */}
        <div className="card p-8 mb-8 bg-white">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-4 w-6 h-6 text-primary-500" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-primary-200 rounded-lg focus:outline-none focus:border-primary-500 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
              <select
                value={filters.jobType}
                onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="all">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="all">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="New York, NY">New York, NY</option>
                <option value="Austin, TX">Austin, TX</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Job List */}
          <div className="md:col-span-2 space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job.id)}
                  className={`card p-6 cursor-pointer transition-all duration-300 ${
                    selectedJob === job.id
                      ? 'border-2 border-primary-500 shadow-lg'
                      : 'border border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-primary-600 font-semibold mb-3">{job.company}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card p-8 text-center">
                <p className="text-gray-600">No jobs found. Try adjusting your filters.</p>
              </div>
            )}
          </div>

          {/* Job Detail */}
          <div>
            {selectedJob ? (
              <div className="card p-6 sticky top-20">
                {(() => {
                  const job = SAMPLE_JOBS.find((j) => j.id === selectedJob)
                  return job ? (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{job.title}</h3>
                      <p className="text-primary-600 font-semibold mb-4">{job.company}</p>
                      
                      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-semibold text-gray-900">{job.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Salary</p>
                          <p className="font-semibold text-gray-900">{job.salary}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Employment Type</p>
                          <p className="font-semibold text-gray-900">{job.type}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                        <p className="text-gray-600 text-sm">{job.description}</p>
                      </div>

                      <button className="btn-secondary w-full">
                        Apply Now
                      </button>
                      <button className="btn-outline w-full mt-3">
                        Save Job
                      </button>
                    </div>
                  ) : null
                })()}
              </div>
            ) : (
              <div className="card p-6 text-center">
                <p className="text-gray-600">Select a job to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
