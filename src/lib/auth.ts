// Shared auth utility — uses localStorage to simulate user registry + approval

export type UserRole = 'employer' | 'jobseeker'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export interface RegisteredUser {
  id: string
  role: UserRole
  fullName: string      // jobseeker
  companyName: string   // employer
  email: string
  phone?: string
  location?: string
  status: ApprovalStatus
  registeredAt: string
}

const STORAGE_KEY = 'eht_users'
const SESSION_KEY = 'eht_session'

// ── Helpers ────────────────────────────────────────────────────────────────────

export function getAllUsers(): RegisteredUser[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveUsers(users: RegisteredUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

// ── Registration ───────────────────────────────────────────────────────────────

export function registerUser(data: Omit<RegisteredUser, 'id' | 'status' | 'registeredAt'>): RegisteredUser {
  const users = getAllUsers()
  const newUser: RegisteredUser = {
    ...data,
    id: `${data.role}_${Date.now()}`,
    status: 'pending',
    registeredAt: new Date().toISOString(),
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

// ── Session ────────────────────────────────────────────────────────────────────

export function setSession(user: RegisteredUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function getSession(): RegisteredUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

// ── Login (match email + role only; no real password check for demo) ───────────

export function loginUser(email: string, role: UserRole): RegisteredUser | null {
  const users = getAllUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role) ?? null
}

// ── Admin actions ──────────────────────────────────────────────────────────────

export function updateUserStatus(id: string, status: ApprovalStatus) {
  const users = getAllUsers()
  const updated = users.map(u => u.id === id ? { ...u, status } : u)
  saveUsers(updated)
}

export function deleteUser(id: string) {
  const users = getAllUsers().filter(u => u.id !== id)
  saveUsers(users)
}

// ── Admin session ──────────────────────────────────────────────────────────────

const ADMIN_SESSION_KEY = 'eht_admin_session'
const ADMIN_EMAIL = 'admin@easyhire.com'
const ADMIN_PASSWORD = 'SuperAdmin123'

export function adminLogin(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_SESSION_KEY, 'true')
    return true
  }
  return false
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(ADMIN_SESSION_KEY) === 'true'
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY)
}
