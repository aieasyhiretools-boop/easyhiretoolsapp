'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Clock, XCircle, Sparkles, Wand2, X, ChevronDown } from 'lucide-react'
import { getSession, getAllUsers } from '@/lib/auth'
import { generateJobPosting } from '@/lib/jobGenerator'

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
  const [approvalStatus, setApprovalStatus] = useState<'loading' | 'pending' | 'approved' | 'rejected' | 'unknown'>('loading')
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
  })

  // AI Generator state
  const [showAIModal, setShowAIModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiInput, setAiInput] = useState({
    jobTitle: '',
    industry: 'tech',
    experienceLevel: 'mid',
    jobType: 'Full-time',
    skills: '',
    companyDescription: '',
  })

  useEffect(() => {
    const session = getSession()
    if (!session) { setApprovalStatus('unknown'); return }
    const users = getAllUsers()
    const fresh = users.find(u => u.id === session.id)
    setApprovalStatus((fresh?.status ?? session.status) as any)
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAIGenerate = () => {
    if (!aiInput.jobTitle) return
    setIsGenerating(true)
    setTimeout(() => {
      const generated = generateJobPosting(aiInput)
      setFormData(prev => ({
        ...prev,
        title: aiInput.jobTitle,
        salary: generated.salaryRange,
        description: `${generated.description}\n\n--- RESPONSIBILITIES ---\n${generated.responsibilities}\n\n--- BENEFITS ---\n${generated.benefits}`,
        requirements: generated.requirements,
      }))
      setIsGenerating(false)
      setShowAIModal(false)
      setShowPostForm(true)
    }, 1200)
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
    setFormData({ title: '', location: '', salary: '', description: '', requirements: '' })
    setShowPostForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="container mx-auto max-w-6xl">

        {/* Approval Gate */}
        {approvalStatus === 'pending' && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Account Pending Approval</h2>
            <p className="text-gray-600 max-w-md mb-4">Your employer account is awaiting admin approval. You will be able to post jobs once approved.</p>
            <div className="px-6 py-3 bg-yellow-50 border border-yellow-300 rounded-xl">
              <p className="text-yellow-800 font-semibold text-sm">⏳ Awaiting Admin Approval</p>
            </div>
          </div>
        )}

        {approvalStatus === 'rejected' && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Account Rejected</h2>
            <p className="text-gray-600 max-w-md">Your employer account application has been rejected. Please contact support for more information.</p>
          </div>
        )}

        {/* Main Dashboard (only shown when approved or no session) */}
        {(approvalStatus === 'approved' || approvalStatus === 'unknown') && <>

        {/* AI Generator Modal */}
        {showAIModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">AI Job Generator</h3>
                    <p className="text-white/80 text-xs">Fill in a few details — AI writes the full posting</p>
                  </div>
                </div>
                <button onClick={() => setShowAIModal(false)} className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title <span className="text-red-500">*</span></label>
                  <input
                    className="input-field"
                    placeholder="e.g., Senior React Developer"
                    value={aiInput.jobTitle}
                    onChange={e => setAiInput(p => ({ ...p, jobTitle: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Industry</label>
                    <select className="input-field" value={aiInput.industry} onChange={e => setAiInput(p => ({ ...p, industry: e.target.value }))}>
                      <option value="tech">Technology</option>
                      <option value="design">Design / UX</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="finance">Finance</option>
                      <option value="hr">HR / People</option>
                      <option value="default">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Experience Level</label>
                    <select className="input-field" value={aiInput.experienceLevel} onChange={e => setAiInput(p => ({ ...p, experienceLevel: e.target.value }))}>
                      <option value="entry">Entry Level (0–2 yrs)</option>
                      <option value="mid">Mid Level (3–5 yrs)</option>
                      <option value="senior">Senior (5–8 yrs)</option>
                      <option value="lead">Lead / Principal (8+ yrs)</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Job Type</label>
                    <select className="input-field" value={aiInput.jobType} onChange={e => setAiInput(p => ({ ...p, jobType: e.target.value }))}>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Key Skills</label>
                    <input
                      className="input-field"
                      placeholder="React, Node.js, AWS"
                      value={aiInput.skills}
                      onChange={e => setAiInput(p => ({ ...p, skills: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company Description <span className="text-gray-400 font-normal">(optional)</span></label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none"
                    rows={2}
                    placeholder="We are a fintech startup building the future of payments..."
                    value={aiInput.companyDescription}
                    onChange={e => setAiInput(p => ({ ...p, companyDescription: e.target.value }))}
                  />
                </div>

                <button
                  onClick={handleAIGenerate}
                  disabled={!aiInput.jobTitle || isGenerating}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold rounded-xl hover:from-primary-600 hover:to-accent-600 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Wand2 className="w-5 h-5" />
                  {isGenerating ? 'Generating your job post...' : 'Generate Job Posting with AI'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Employer Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your job postings and applications</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setShowAIModal(true); setShowPostForm(false) }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold rounded-lg hover:from-primary-600 hover:to-accent-600 transition shadow-md text-sm"
            >
              <Sparkles className="w-4 h-4" />
              AI Generate Job Post
            </button>
            <button
              onClick={() => { setShowPostForm(!showPostForm); setShowAIModal(false) }}
              className="btn-secondary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post Manually
            </button>
          </div>
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
          <div className="card p-8 mb-8 bg-white border-2 border-primary-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {formData.description ? '✨ AI-Generated Job Post — Review & Edit' : 'Create New Job Posting'}
              </h2>
              {formData.description && (
                <button
                  onClick={() => setShowAIModal(true)}
                  className="flex items-center gap-1.5 text-sm text-primary-600 font-semibold hover:text-primary-700 transition"
                >
                  <Wand2 className="w-4 h-4" />
                  Re-generate
                </button>
              )}
            </div>
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
                <button type="submit" className="btn-primary">
                  Post Job
                </button>
                <button
                  type="button"
                  onClick={() => setShowPostForm(false)}
                  className="px-6 py-2 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
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
        </>}
      </div>
    </div>
  )
}
