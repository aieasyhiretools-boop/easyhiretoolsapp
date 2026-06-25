'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap,
  Plus, Trash2, Download, ArrowLeft, Sparkles, FileText, ChevronDown, ChevronUp
} from 'lucide-react'

interface Experience {
  id: number
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: number
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  grade: string
}

interface ResumeData {
  // Personal
  fullName: string
  email: string
  phone: string
  address: string
  linkedin: string
  portfolio: string
  // Objective
  objective: string
  // Experience
  experiences: Experience[]
  // Education
  education: Education[]
  // Skills
  technicalSkills: string
  softSkills: string
  languages: string
  // Certifications
  certifications: string
  // Achievements
  achievements: string
}

const defaultExp = (): Experience => ({
  id: Date.now(),
  jobTitle: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
})

const defaultEdu = (): Education => ({
  id: Date.now(),
  degree: '',
  institution: '',
  location: '',
  startDate: '',
  endDate: '',
  grade: '',
})

export default function ResumeBuilder() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('personal')
  const [data, setData] = useState<ResumeData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    portfolio: '',
    objective: '',
    experiences: [defaultExp()],
    education: [defaultEdu()],
    technicalSkills: '',
    softSkills: '',
    languages: '',
    certifications: '',
    achievements: '',
  })

  const update = (field: keyof ResumeData, value: string) =>
    setData(prev => ({ ...prev, [field]: value }))

  const updateExp = (id: number, field: keyof Experience, value: string | boolean) =>
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? { ...e, [field]: value } : e),
    }))

  const updateEdu = (id: number, field: keyof Education, value: string) =>
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e),
    }))

  const addExp = () => setData(prev => ({ ...prev, experiences: [...prev.experiences, defaultExp()] }))
  const removeExp = (id: number) => setData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }))
  const addEdu = () => setData(prev => ({ ...prev, education: [...prev.education, defaultEdu()] }))
  const removeEdu = (id: number) => setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }))

  const generateAndDownload = async () => {
    if (!data.fullName || !data.email) {
      alert('Please fill in at least your Full Name and Email.')
      return
    }

    setIsGenerating(true)

    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType } = await import('docx')
      const { saveAs } = await import('file-saver')

      const sectionHeading = (text: string) =>
        new Paragraph({
          children: [
            new TextRun({
              text: text.toUpperCase(),
              bold: true,
              size: 24,
              color: '0052cc',
            }),
          ],
          spacing: { before: 300, after: 100 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 2, color: '0052cc' },
          },
        })

      const bullet = (text: string) =>
        new Paragraph({
          children: [new TextRun({ text, size: 20 })],
          bullet: { level: 0 },
          spacing: { after: 60 },
        })

      const children: any[] = []

      // ─── HEADER ────────────────────────────────────────────────────────────
      children.push(
        new Paragraph({
          children: [new TextRun({ text: data.fullName, bold: true, size: 48, color: '0052cc' })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
        })
      )

      const contactParts = [data.email, data.phone, data.address, data.linkedin, data.portfolio]
        .filter(Boolean).join('   |   ')

      if (contactParts) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: contactParts, size: 18, color: '444444' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          })
        )
      }

      // ─── OBJECTIVE ─────────────────────────────────────────────────────────
      if (data.objective) {
        children.push(sectionHeading('Professional Summary'))
        children.push(new Paragraph({
          children: [new TextRun({ text: data.objective, size: 20 })],
          spacing: { after: 100 },
        }))
      }

      // ─── EXPERIENCE ────────────────────────────────────────────────────────
      const filledExp = data.experiences.filter(e => e.jobTitle || e.company)
      if (filledExp.length > 0) {
        children.push(sectionHeading('Work Experience'))
        for (const exp of filledExp) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: exp.jobTitle, bold: true, size: 22 }),
                new TextRun({ text: exp.company ? `  —  ${exp.company}` : '', size: 22, color: '444444' }),
              ],
              spacing: { after: 40 },
            })
          )
          const dateStr = [exp.location, exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join('  •  ')
          if (dateStr) {
            children.push(new Paragraph({
              children: [new TextRun({ text: dateStr, size: 18, color: '666666', italics: true })],
              spacing: { after: 60 },
            }))
          }
          if (exp.description) {
            exp.description.split('\n').filter(Boolean).forEach(line => {
              children.push(bullet(line.trim()))
            })
          }
          children.push(new Paragraph({ children: [], spacing: { after: 80 } }))
        }
      }

      // ─── EDUCATION ─────────────────────────────────────────────────────────
      const filledEdu = data.education.filter(e => e.degree || e.institution)
      if (filledEdu.length > 0) {
        children.push(sectionHeading('Education'))
        for (const edu of filledEdu) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true, size: 22 }),
                new TextRun({ text: edu.institution ? `  —  ${edu.institution}` : '', size: 22, color: '444444' }),
              ],
              spacing: { after: 40 },
            })
          )
          const eduMeta = [edu.location, edu.startDate, edu.endDate, edu.grade].filter(Boolean).join('  •  ')
          if (eduMeta) {
            children.push(new Paragraph({
              children: [new TextRun({ text: eduMeta, size: 18, color: '666666', italics: true })],
              spacing: { after: 100 },
            }))
          }
        }
      }

      // ─── SKILLS ────────────────────────────────────────────────────────────
      if (data.technicalSkills || data.softSkills || data.languages) {
        children.push(sectionHeading('Skills'))
        if (data.technicalSkills) {
          children.push(new Paragraph({
            children: [
              new TextRun({ text: 'Technical Skills: ', bold: true, size: 20 }),
              new TextRun({ text: data.technicalSkills, size: 20 }),
            ],
            spacing: { after: 60 },
          }))
        }
        if (data.softSkills) {
          children.push(new Paragraph({
            children: [
              new TextRun({ text: 'Soft Skills: ', bold: true, size: 20 }),
              new TextRun({ text: data.softSkills, size: 20 }),
            ],
            spacing: { after: 60 },
          }))
        }
        if (data.languages) {
          children.push(new Paragraph({
            children: [
              new TextRun({ text: 'Languages: ', bold: true, size: 20 }),
              new TextRun({ text: data.languages, size: 20 }),
            ],
            spacing: { after: 60 },
          }))
        }
      }

      // ─── CERTIFICATIONS ────────────────────────────────────────────────────
      if (data.certifications) {
        children.push(sectionHeading('Certifications'))
        data.certifications.split('\n').filter(Boolean).forEach(line => {
          children.push(bullet(line.trim()))
        })
      }

      // ─── ACHIEVEMENTS ──────────────────────────────────────────────────────
      if (data.achievements) {
        children.push(sectionHeading('Achievements & Awards'))
        data.achievements.split('\n').filter(Boolean).forEach(line => {
          children.push(bullet(line.trim()))
        })
      }

      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: { top: 720, bottom: 720, left: 900, right: 900 },
            },
          },
          children,
        }],
      })

      const blob = await Packer.toBlob(doc)
      const fileName = `${data.fullName.replace(/\s+/g, '_')}_Resume.docx`
      saveAs(blob, fileName)
    } catch (err) {
      console.error(err)
      alert('Failed to generate resume. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'objective', label: 'Summary', icon: Sparkles },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: FileText },
    { id: 'extras', label: 'Certifications & Awards', icon: Sparkles },
  ]

  const inputCls = 'input-field text-sm'
  const labelCls = 'block text-sm font-semibold text-gray-700 mb-1'
  const textareaCls = 'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/jobseeker/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Candidate Avatar Tool</h1>
                <p className="text-xs text-gray-500">AI Resume Builder — Generate & Download as Word (.docx)</p>
              </div>
            </div>
          </div>
          <button
            onClick={generateAndDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-md disabled:opacity-70"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Download Resume (.docx)'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600">
              <p className="text-white font-bold text-sm">Fill Each Section</p>
              <p className="text-primary-100 text-xs mt-1">Complete all fields for best results</p>
            </div>
            <nav className="p-2">
              {sections.map(s => {
                const Icon = s.icon
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition mb-1 ${
                      activeSection === s.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {s.label}
                  </button>
                )
              })}
            </nav>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={generateAndDownload}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-lg hover:from-accent-600 hover:to-accent-700 transition shadow-md disabled:opacity-70 text-sm"
              >
                <Download className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Download .docx'}
              </button>
            </div>
          </div>
        </aside>

        {/* Form */}
        <main className="lg:col-span-3 space-y-6">

          {/* ── PERSONAL INFO ── */}
          {activeSection === 'personal' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary-500" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
                  <input className={inputCls} placeholder="John Doe" value={data.fullName} onChange={e => update('fullName', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Email Address <span className="text-red-500">*</span></label>
                  <input type="email" className={inputCls} placeholder="john@email.com" value={data.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input type="tel" className={inputCls} placeholder="+1 555 123-4567" value={data.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Address / City, Country</label>
                  <input className={inputCls} placeholder="New York, NY, USA" value={data.address} onChange={e => update('address', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>LinkedIn URL</label>
                  <input className={inputCls} placeholder="linkedin.com/in/johndoe" value={data.linkedin} onChange={e => update('linkedin', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Portfolio / Website</label>
                  <input className={inputCls} placeholder="johndoe.com" value={data.portfolio} onChange={e => update('portfolio', e.target.value)} />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => setActiveSection('objective')} className="btn-primary text-sm">Next: Summary →</button>
              </div>
            </div>
          )}

          {/* ── OBJECTIVE / SUMMARY ── */}
          {activeSection === 'objective' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-500" /> Professional Summary
              </h2>
              <p className="text-sm text-gray-500 mb-4">Write 3–5 sentences describing your career goals, strengths, and what you bring to employers.</p>
              <textarea
                className={textareaCls}
                rows={6}
                placeholder="Motivated software engineer with 5+ years of experience building scalable web applications. Passionate about clean code and user-centric design. Looking for a challenging role where I can leverage my React and Node.js expertise..."
                value={data.objective}
                onChange={e => update('objective', e.target.value)}
              />
              <div className="mt-6 flex justify-between">
                <button onClick={() => setActiveSection('personal')} className="btn-secondary text-sm">← Back</button>
                <button onClick={() => setActiveSection('experience')} className="btn-primary text-sm">Next: Experience →</button>
              </div>
            </div>
          )}

          {/* ── EXPERIENCE ── */}
          {activeSection === 'experience' && (
            <div className="space-y-4">
              {data.experiences.map((exp, idx) => (
                <div key={exp.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary-500" /> Experience {idx + 1}
                    </h2>
                    {data.experiences.length > 1 && (
                      <button onClick={() => removeExp(exp.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Job Title</label>
                      <input className={inputCls} placeholder="Senior Developer" value={exp.jobTitle} onChange={e => updateExp(exp.id, 'jobTitle', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Company Name</label>
                      <input className={inputCls} placeholder="Tech Corp Ltd" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Location</label>
                      <input className={inputCls} placeholder="New York, NY" value={exp.location} onChange={e => updateExp(exp.id, 'location', e.target.value)} />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className={labelCls}>Start Date</label>
                        <input type="month" className={inputCls} value={exp.startDate} onChange={e => updateExp(exp.id, 'startDate', e.target.value)} />
                      </div>
                      <div className="flex-1">
                        <label className={labelCls}>End Date</label>
                        <input type="month" className={inputCls} value={exp.endDate} onChange={e => updateExp(exp.id, 'endDate', e.target.value)} disabled={exp.current} />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 font-semibold">
                        <input type="checkbox" className="w-4 h-4 text-primary-600" checked={exp.current} onChange={e => updateExp(exp.id, 'current', e.target.checked)} />
                        I currently work here
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelCls}>Key Responsibilities & Achievements</label>
                      <p className="text-xs text-gray-400 mb-1">Enter each point on a new line — they will appear as bullet points in your resume.</p>
                      <textarea className={textareaCls} rows={5}
                        placeholder={"Built RESTful APIs used by 10K+ users daily\nReduced page load time by 40% through code optimization\nLed a team of 5 developers across 3 projects"}
                        value={exp.description} onChange={e => updateExp(exp.id, 'description', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addExp} className="w-full py-3 border-2 border-dashed border-primary-300 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition flex items-center justify-center gap-2 text-sm">
                <Plus className="w-4 h-4" /> Add Another Experience
              </button>
              <div className="flex justify-between">
                <button onClick={() => setActiveSection('objective')} className="btn-secondary text-sm">← Back</button>
                <button onClick={() => setActiveSection('education')} className="btn-primary text-sm">Next: Education →</button>
              </div>
            </div>
          )}

          {/* ── EDUCATION ── */}
          {activeSection === 'education' && (
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={edu.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary-500" /> Education {idx + 1}
                    </h2>
                    {data.education.length > 1 && (
                      <button onClick={() => removeEdu(edu.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Degree / Qualification</label>
                      <input className={inputCls} placeholder="B.Sc. Computer Science" value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Institution / University</label>
                      <input className={inputCls} placeholder="MIT" value={edu.institution} onChange={e => updateEdu(edu.id, 'institution', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Location</label>
                      <input className={inputCls} placeholder="Cambridge, MA" value={edu.location} onChange={e => updateEdu(edu.id, 'location', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Grade / GPA</label>
                      <input className={inputCls} placeholder="3.9 / 4.0 or First Class" value={edu.grade} onChange={e => updateEdu(edu.id, 'grade', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Start Year</label>
                      <input type="month" className={inputCls} value={edu.startDate} onChange={e => updateEdu(edu.id, 'startDate', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>End Year</label>
                      <input type="month" className={inputCls} value={edu.endDate} onChange={e => updateEdu(edu.id, 'endDate', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addEdu} className="w-full py-3 border-2 border-dashed border-primary-300 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition flex items-center justify-center gap-2 text-sm">
                <Plus className="w-4 h-4" /> Add Another Education
              </button>
              <div className="flex justify-between">
                <button onClick={() => setActiveSection('experience')} className="btn-secondary text-sm">← Back</button>
                <button onClick={() => setActiveSection('skills')} className="btn-primary text-sm">Next: Skills →</button>
              </div>
            </div>
          )}

          {/* ── SKILLS ── */}
          {activeSection === 'skills' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-500" /> Skills
              </h2>
              <div>
                <label className={labelCls}>Technical Skills</label>
                <p className="text-xs text-gray-400 mb-1">Separate with commas</p>
                <textarea className={textareaCls} rows={3} placeholder="React, Node.js, TypeScript, Python, AWS, Docker, PostgreSQL" value={data.technicalSkills} onChange={e => update('technicalSkills', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Soft Skills</label>
                <textarea className={textareaCls} rows={2} placeholder="Leadership, Communication, Problem Solving, Team Collaboration" value={data.softSkills} onChange={e => update('softSkills', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Languages</label>
                <textarea className={textareaCls} rows={2} placeholder="English (Fluent), Spanish (Intermediate), French (Basic)" value={data.languages} onChange={e => update('languages', e.target.value)} />
              </div>
              <div className="flex justify-between">
                <button onClick={() => setActiveSection('education')} className="btn-secondary text-sm">← Back</button>
                <button onClick={() => setActiveSection('extras')} className="btn-primary text-sm">Next: Extras →</button>
              </div>
            </div>
          )}

          {/* ── CERTIFICATIONS & ACHIEVEMENTS ── */}
          {activeSection === 'extras' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-500" /> Certifications & Achievements
              </h2>
              <div>
                <label className={labelCls}>Certifications</label>
                <p className="text-xs text-gray-400 mb-1">Enter each on a new line</p>
                <textarea className={textareaCls} rows={4} placeholder={"AWS Certified Solutions Architect — Amazon (2023)\nGoogle Professional Cloud Developer (2022)\nMeta React Developer Certificate (2022)"} value={data.certifications} onChange={e => update('certifications', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Achievements & Awards</label>
                <p className="text-xs text-gray-400 mb-1">Enter each on a new line</p>
                <textarea className={textareaCls} rows={4} placeholder={"Best Employee of the Year 2023 — Tech Corp\nHackathon Winner — Global Dev Summit 2022\nPublished 3 open-source projects with 500+ GitHub stars"} value={data.achievements} onChange={e => update('achievements', e.target.value)} />
              </div>
              <div className="flex justify-between">
                <button onClick={() => setActiveSection('skills')} className="btn-secondary text-sm">← Back</button>
                <button
                  onClick={generateAndDownload}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-lg hover:from-accent-600 hover:to-accent-700 transition shadow-md disabled:opacity-70 text-sm"
                >
                  <Download className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate & Download Resume'}
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
