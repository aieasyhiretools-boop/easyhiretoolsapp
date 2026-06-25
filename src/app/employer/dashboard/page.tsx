'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

interface PostedJob {
  id: number
  title: string
  location: string
  applicants: number
  views: number
  postedDate: string
}

const SAMPLE_POSTED_JOBS: PostedJob[] = [
  {
    id: 1,
    title: 'Senior React Developer',
    location: 'San Francisco, CA',
    applicants: 24,
    views: 312,
    postedDate: '2 days ago',
  },
  {
    id: 2,
    title: 'Product Manager',
    location: 'New York, NY',
    applicants: 15,
    views: 189,
    postedDate: '1 week ago',
  },
]

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<PostedJob[]>(SAMPLE_POSTED_JOBS)
  const [showPostForm, setShowPostForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault()
    const newJob: PostedJob = {
      id: jobs.length + 1,
      title: formData.title,
      location: formData.location,
      applicants: 0,
      views: 0,
      postedDate: 'Just now',
    }
    setJobs([newJob, ...jobs])
    setFormData({
      title: '',
      location: '',
      salary: '',
      description: '',
      requirements: '',
    })
    setShowPostForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Employer Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your job postings and applications</p>
          </div>
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Post New Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Jobs', value: jobs.length },
            { label: 'Total Applicants', value: jobs.reduce((sum, job) => sum + job.applicants, 0) },
            { label: 'Total Views', value: jobs.reduce((sum, job) => sum + job.views, 0) },
            { label: 'Profile Views', value: 1247 },
          ].map((stat, idx) => (
            <div key={idx} className="card p-6">
              <p className="text-gray-600 font-semibold mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-accent-600">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Post Job Form */}
        {showPostForm && (
          <div className="card p-8 mb-8 bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Job Posting</h2>
            <form onSubmit={handlePostJob} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior React Developer"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., San Francisco, CA"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g., $120k - $160k"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  className="input-field h-32 resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="List key requirements (skills, experience, etc.)"
                  className="input-field h-24 resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-secondary">
                  Post Job
                </button>
                <button
                  type="button"
                  onClick={() => setShowPostForm(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs List */}
        <div className="card bg-white">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Job Postings</h2>

            {jobs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Job Title</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Location</th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-700">Applicants</th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-700">Views</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Posted</th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-semibold text-gray-900">{job.title}</p>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{job.location}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {job.applicants}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="flex items-center justify-center gap-1 text-gray-600">
                            <Eye className="w-4 h-4" />
                            {job.views}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">{job.postedDate}</td>
                        <td className="py-4 px-4">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 hover:bg-primary-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-primary-600" />
                            </button>
                            <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">No jobs posted yet. Create your first job posting!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
