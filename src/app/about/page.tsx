import Link from 'next/link'
import { Target, Heart, Zap, Users, Award, Globe, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

export default function About() {
  const values = [
    { icon: Target, title: 'Mission-Driven', desc: 'We exist to connect great talent with great companies — making hiring faster, fairer, and more effective for everyone.' },
    { icon: Heart, title: 'People First', desc: 'Every feature we build puts people at the centre — whether you are a job seeker, an employer, or an admin managing the platform.' },
    { icon: Zap, title: 'AI-Powered', desc: 'We leverage cutting-edge AI to help candidates craft outstanding resumes and employers write compelling job postings in seconds.' },
    { icon: Globe, title: 'Inclusive Hiring', desc: 'We believe everyone deserves a fair shot. Our platform is built to reduce bias and increase opportunity for all.' },
  ]

  const team = [
    { name: 'Aditya Sharma', role: 'Founder & CEO', initials: 'AS', color: 'bg-primary-500' },
    { name: 'Priya Patel', role: 'Head of Product', initials: 'PP', color: 'bg-accent-500' },
    { name: 'James Wright', role: 'Lead Engineer', initials: 'JW', color: 'bg-purple-500' },
    { name: 'Sarah Chen', role: 'Head of Design', initials: 'SC', color: 'bg-green-500' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <Heart className="w-4 h-4 text-red-400" />
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            About <span className="text-accent-400">EasyHireTools</span>
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
            We started with one belief: hiring should be easy, transparent, and human. EasyHireTools is a modern job portal that combines intelligent technology with a people-first approach to transform how companies hire and how talent finds opportunity.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why We Built EasyHireTools</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              The traditional hiring process is broken — it is slow, opaque, and often frustrating for both sides. Employers spend weeks sifting through unqualified applications. Job seekers send hundreds of applications into the void.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              EasyHireTools was built to fix that. By combining AI-powered tools for both employers and candidates, a rigorous approval system for quality control, and an intuitive interface, we have created a platform where every interaction is meaningful.
            </p>
            <Link href="/jobseeker/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition">
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2024', label: 'Founded' },
              { value: '10K+', label: 'Job Seekers' },
              { value: '500+', label: 'Employers' },
              { value: '95%', label: 'Success Rate' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <p className="text-4xl font-black text-primary-600 mb-2">{s.value}</p>
                <p className="text-gray-500 font-semibold text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-500 text-lg">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => {
              const Icon = v.icon
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-gray-500 text-lg">Passionate people building the future of hiring</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="text-center">
                <div className={`w-20 h-20 ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <span className="text-white font-black text-xl">{member.initials}</span>
                </div>
                <p className="font-bold text-gray-900">{member.name}</p>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-500 text-lg">We&apos;d love to hear from you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: 'Email Us', value: 'hello@easyhiretools.com', color: 'bg-blue-100 text-blue-600' },
              { icon: Phone, label: 'Call Us', value: '+1 (555) 012-3456', color: 'bg-green-100 text-green-600' },
              { icon: MapPin, label: 'Visit Us', value: '123 Tech Avenue, San Francisco, CA', color: 'bg-purple-100 text-purple-600' },
            ].map(c => {
              const Icon = c.icon
              return (
                <div key={c.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${c.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-gray-900 mb-1">{c.label}</p>
                  <p className="text-gray-500 text-sm">{c.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join the EasyHireTools Community</h2>
          <p className="text-white/80 text-lg mb-8">Whether you&apos;re hiring or job seeking — we&apos;ve got you covered.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/jobseeker/signup" className="px-8 py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-100 transition">
              Find a Job
            </Link>
            <Link href="/employer/signup" className="px-8 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition border border-white/40">
              Post a Job
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
