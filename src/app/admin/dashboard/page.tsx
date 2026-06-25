'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Shield, Users, Briefcase, CheckCircle, XCircle, Clock,
  LogOut, Search, RefreshCw, Building, User, Trash2, Check, X
} from 'lucide-react'
import {
  getAllUsers, updateUserStatus, deleteUser, isAdminLoggedIn, adminLogout,
  RegisteredUser, ApprovalStatus
} from '@/lib/auth'

type TabType = 'all' | 'pending' | 'approved' | 'rejected' | 'employers' | 'jobseekers'

export default function AdminDashboard() {
  const router = useRouter()
  const [users, setUsers] = useState<RegisteredUser[]>([])
  const [tab, setTab] = useState<TabType>('pending')
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.push('/admin/login')
      return
    }
    setUsers(getAllUsers())
  }, [router, refreshKey])

  const refresh = () => setRefreshKey(k => k + 1)

  const handleApprove = (id: string) => {
    updateUserStatus(id, 'approved')
    refresh()
  }

  const handleReject = (id: string) => {
    updateUserStatus(id, 'rejected')
    refresh()
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this user permanently?')) {
      deleteUser(id)
      refresh()
    }
  }

  const handleLogout = () => {
    adminLogout()
    router.push('/admin/login')
  }

  // Filter
  const filtered = users.filter(u => {
    const name = (u.companyName || u.fullName || '').toLowerCase()
    const matchSearch = name.includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    if (!matchSearch) return false
    if (tab === 'pending') return u.status === 'pending'
    if (tab === 'approved') return u.status === 'approved'
    if (tab === 'rejected') return u.status === 'rejected'
    if (tab === 'employers') return u.role === 'employer'
    if (tab === 'jobseekers') return u.role === 'jobseeker'
    return true
  })

  // Stats
  const stats = {
    total: users.length,
    pending: users.filter(u => u.status === 'pending').length,
    approved: users.filter(u => u.status === 'approved').length,
    rejected: users.filter(u => u.status === 'rejected').length,
    employers: users.filter(u => u.role === 'employer').length,
    jobseekers: users.filter(u => u.role === 'jobseeker').length,
  }

  const statusBadge = (status: ApprovalStatus) => {
    if (status === 'approved') return <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">Approved</span>
    if (status === 'rejected') return <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">Rejected</span>
    return <span className="px-2 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700">Pending</span>
  }

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: 'pending', label: 'Pending Approval', count: stats.pending },
    { key: 'approved', label: 'Approved', count: stats.approved },
    { key: 'rejected', label: 'Rejected', count: stats.rejected },
    { key: 'employers', label: 'All Employers', count: stats.employers },
    { key: 'jobseekers', label: 'All Job Seekers', count: stats.jobseekers },
    { key: 'all', label: 'All Users', count: stats.total },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-gradient-to-r from-gray-900 to-slate-800 shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Admin Dashboard</h1>
              <p className="text-gray-400 text-xs">EasyHireTools — User Approval Centre</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.total, color: 'bg-slate-100 text-slate-700', icon: Users },
            { label: 'Pending', value: stats.pending, color: 'bg-yellow-100 text-yellow-700', icon: Clock },
            { label: 'Approved', value: stats.approved, color: 'bg-green-100 text-green-700', icon: CheckCircle },
            { label: 'Rejected', value: stats.rejected, color: 'bg-red-100 text-red-700', icon: XCircle },
            { label: 'Employers', value: stats.employers, color: 'bg-blue-100 text-blue-700', icon: Building },
            { label: 'Job Seekers', value: stats.jobseekers, color: 'bg-purple-100 text-purple-700', icon: User },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className={`rounded-xl p-4 ${s.color} flex flex-col gap-1`}>
                <Icon className="w-5 h-5 opacity-70" />
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs font-semibold opacity-80">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* Pending alert */}
        {stats.pending > 0 && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-300 rounded-xl">
            <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <p className="text-yellow-800 font-semibold text-sm">
              {stats.pending} user{stats.pending > 1 ? 's are' : ' is'} waiting for approval. Review them below.
            </p>
          </div>
        )}

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs + Search */}
          <div className="border-b border-gray-100 px-6 pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    tab === t.key
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t.label}
                  <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${
                    tab === t.key ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>{t.count}</span>
                </button>
              ))}
            </div>
            <div className="pb-4 flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button onClick={refresh} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition" title="Refresh">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-semibold">No users found</p>
              <p className="text-gray-400 text-sm mt-1">
                {tab === 'pending' ? 'No pending approvals right now.' : 'Try adjusting your filters.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Registered</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(user => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                            user.role === 'employer' ? 'bg-blue-500' : 'bg-purple-500'
                          }`}>
                            {(user.companyName || user.fullName || '?')[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.companyName || user.fullName}</p>
                            {user.location && <p className="text-xs text-gray-400">{user.location}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-full text-xs font-bold ${
                          user.role === 'employer'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {user.role === 'employer' ? <Building className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          {user.role === 'employer' ? 'Employer' : 'Job Seeker'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{user.email}</p>
                        {user.phone && <p className="text-xs text-gray-400">{user.phone}</p>}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {new Date(user.registeredAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">{statusBadge(user.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.status !== 'approved' && (
                            <button
                              onClick={() => handleApprove(user.id)}
                              title="Approve"
                              className="p-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          {user.status !== 'rejected' && (
                            <button
                              onClick={() => handleReject(user.id)}
                              title="Reject"
                              className="p-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(user.id)}
                            title="Delete"
                            className="p-1.5 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
