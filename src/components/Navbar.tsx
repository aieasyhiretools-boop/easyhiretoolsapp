'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="EasyHireTools"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">
              <span className="text-primary-600">Easy</span>
              <span className="text-accent-600">Hire</span>
              <span className="text-gray-900">Tools</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-semibold transition">
              Home
            </Link>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-semibold transition">
              Browse Jobs
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-semibold transition">
              For Employers
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-semibold transition">
              About
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/jobseeker/login" className="text-primary-600 font-semibold hover:text-primary-700 transition">
              Job Seeker
            </Link>
            <Link href="/employer/login" className="btn-secondary px-6 py-2">
              Employer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-gray-200 pt-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-primary-600 font-semibold py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <a href="#" className="block text-gray-700 hover:text-primary-600 font-semibold py-2">
              Browse Jobs
            </a>
            <a href="#" className="block text-gray-700 hover:text-primary-600 font-semibold py-2">
              For Employers
            </a>
            <a href="#" className="block text-gray-700 hover:text-primary-600 font-semibold py-2">
              About
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/jobseeker/login" className="btn-primary text-center py-2">
                Job Seeker Login
              </Link>
              <Link href="/employer/login" className="btn-secondary text-center py-2">
                Employer Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
