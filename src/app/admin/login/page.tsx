'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Shield, ArrowRight } from 'lucide-react'
import { adminLogin } from '@/lib/auth'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const success = adminLogin(email, password)
      if (success) {
        router.push('/admin/dashboard')
      } else {
        setError('Invalid admin credentials. Please try again.')
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-gray-900 to-slate-700 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-gray-400 text-sm mt-1">EasyHireTools Administration</p>
          </div>

          <div className="px-8 py-8">
            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    className="input-field pl-10"
                    placeholder="admin@easyhire.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    className="input-field pl-10"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError('') }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gray-800 to-slate-700 text-white font-bold rounded-lg hover:from-gray-900 hover:to-slate-800 transition-all shadow-md disabled:opacity-70"
              >
                {isLoading ? 'Signing in...' : 'Sign In to Admin Panel'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700 font-semibold text-center">
                🔒 Restricted access — authorised personnel only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
