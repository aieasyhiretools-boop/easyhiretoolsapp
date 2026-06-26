import Link from 'next/link'
import { Briefcase, Users, Sparkles, BarChart3, CheckCircle, ArrowRight, Zap, Shield, Search } from 'lucide-react'

export default function ForEmployers() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Job Generator',
      description: 'Create professional job postings in seconds. Our AI writes compelling descriptions, requirements, and salary ranges based on your role details.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Users,
      title: 'Pre-Screened Candidates',
      description: 'All job seekers are admin-verified before they can apply, ensuring you only receive applications from serious, qualified professionals.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Search,
      title: 'Smart Applicant Management',
      description: 'Track all applications, view candidate profiles, and manage the full hiring pipeline from a single, intuitive dashboard.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'See how your job listings are performing — views, applications, and engagement metrics — all in real time.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Zap,
      title: 'Fast Time-to-Hire',
      description: 'Our streamlined process helps you go from posting a job to making an offer faster than any other platform.',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'All employer accounts are reviewed and approved by our team, maintaining platform quality and trust for everyone.',
      color: 'bg-red-100 text-red-600',
    },
  ]

  const steps = [
    { step: '01', title: 'Register Your Company', desc: 'Create your employer account with your company details. Our team reviews and approves within 1–2 hours.' },
    { step: '02', title: 'Post a Job', desc: 'Use our AI Job Generator or write your own posting. Add requirements, salary, and location in minutes.' },
    { step: '03', title: 'Review Applicants', desc: 'Receive applications from pre-screened candidates. View resumes and manage candidates in your dashboard.' },
    { step: '04', title: 'Hire the Best', desc: 'Connect with top talent and make your hire. Our platform supports you through every step of the process.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-500 via-accent-600 to-orange-700 py-24 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <Briefcase className="w-4 h-4" />
            For Employers
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Hire Smarter with <span className="text-yellow-300">EasyHireTools</span>
          </h1>
          <p className="text-orange-100 text-xl mb-10 max-w-2xl mx-auto">
            Post jobs in minutes with AI assistance, reach pre-screened candidates, and manage your entire hiring process from one powerful dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/employer/signup"
              className="flex items-center gap-2 px-8 py-4 bg-white text-accent-600 font-bold rounded-xl text-lg hover:bg-orange-50 transition shadow-lg">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/employer/login"
              className="flex items-center gap-2 px-8 py-4 bg-white/20 text-white font-bold rounded-xl text-lg hover:bg-white/30 transition border border-white/40">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10K+', label: 'Active Job Seekers' },
            { value: '500+', label: 'Companies Hiring' },
            { value: '95%', label: 'Placement Rate' },
            { value: '48h', label: 'Avg. Time to First Applicant' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold text-accent-400">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Hire</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Powerful tools designed to make hiring faster, smarter, and more effective.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg">From sign-up to hire in 4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-black text-xl">{s.step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gray-200" />
                )}
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Find Your Next Great Hire?</h2>
          <p className="text-primary-200 text-lg mb-8">Join hundreds of companies already using EasyHireTools to build their teams.</p>
          <Link href="/employer/signup"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary-700 font-bold rounded-xl text-lg hover:bg-primary-50 transition shadow-xl">
            Create Employer Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
