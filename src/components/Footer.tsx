'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary-400">Easy</span>
              <span className="text-accent-400">Hire</span>
              <span>Tools</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting talented professionals with top employers. Your dream job is just a click away.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-primary-400 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-400 transition">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-400 transition">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-400 transition">
                  Career Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-accent-400 transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent-400 transition">
                  Browse Talent
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent-400 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent-400 transition">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@easyhiretools.com" className="hover:text-primary-400 transition">
                  support@easyhiretools.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:text-primary-400 transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Tech Street, San Francisco, CA 94105</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2024 EasyHireTools. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-primary-400 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary-400 transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary-400 transition">
              Cookie Policy
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="p-2 hover:bg-primary-600 rounded-lg transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:bg-primary-600 rounded-lg transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:bg-primary-600 rounded-lg transition">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
