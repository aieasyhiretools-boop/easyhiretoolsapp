'use client'

import Link from 'next/link'
import { Briefcase, Users, Search, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 text-white flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your <span className="text-accent-400">Dream Job</span> Today
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Connect with top employers and discover opportunities that match your skills. Or hire the perfect candidate for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/jobseeker/login" className="btn-secondary text-center">
                Job Seeker Login
              </Link>
              <Link href="/employer/login" className="btn-outline text-center">
                Employer Login
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-to-br from-accent-400 to-accent-600 rounded-3xl shadow-2xl rotate-12"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-400 to-accent-400 rounded-3xl blur-2xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose EasyHireTools?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Post Jobs Easily',
                desc: 'Employers can post jobs in minutes with our intuitive interface',
              },
              {
                icon: Search,
                title: 'Smart Search',
                desc: 'Job seekers can find relevant positions using advanced filters',
              },
              {
                icon: Users,
                title: 'Connect & Hire',
                desc: 'Direct connection between employers and talented candidates',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="card p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Active Jobs' },
              { number: '5K+', label: 'Employers' },
              { number: '50K+', label: 'Job Seekers' },
              { number: '95%', label: 'Success Rate' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-accent-500 to-accent-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-gray-100">Join thousands of successful job placements</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobseeker/login" className="px-8 py-4 bg-white text-accent-600 font-bold rounded-lg hover:bg-gray-100 transition-all">
              Find Jobs
            </Link>
            <Link href="/employer/login" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-accent-600 transition-all">
              Post a Job
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
