# 🎯 EasyHireTools - Job Portal Web App

A modern, beautiful, and fully responsive job portal web application built with **Next.js 14**, **React**, **TypeScript**, and **Tailwind CSS**.

## 📋 Features

### For Job Seekers
- ✅ User registration and login
- ✅ Advanced job search with filters
- ✅ Job listings with detailed information
- ✅ Save favorite jobs
- ✅ Apply for positions
- ✅ View job details side panel

### For Employers
- ✅ Company registration and login
- ✅ Post job listings
- ✅ Manage job postings
- ✅ View applicants
- ✅ Track job views and applications
- ✅ Edit and delete job postings

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Fully mobile-friendly on all devices
- **Brand Colors**: Blue (#0052cc) and Orange (#ff6b35) matching EasyHireTools logo
- **Accessible**: WCAG compliant with proper contrast and keyboard navigation
- **Performance**: Optimized for fast loading and smooth interactions

## 📁 Project Structure

```
easyhiretools-app/
├── public/                 # Static assets
│   └── logo.png           # 👈 Your EasyHireTools logo
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home/Landing page
│   │   ├── globals.css    # Global styles
│   │   ├── jobseeker/     # Job seeker routes
│   │   │   ├── login/     # Login page
│   │   │   ├── signup/    # Signup page
│   │   │   └── dashboard/ # Job search dashboard
│   │   └── employer/      # Employer routes
│   │       ├── login/     # Employer login
│   │       ├── signup/    # Company registration
│   │       └── dashboard/ # Job management dashboard
│   └── components/
│       ├── Navbar.tsx     # Navigation bar with logo
│       └── Footer.tsx     # Footer component
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 🎯 Key Pages & Routes

| Route | Description |
|-------|---|
| `/` | Landing/Home page |
| `/jobseeker/login` | Job seeker login |
| `/jobseeker/signup` | Job seeker registration |
| `/jobseeker/dashboard` | Job search & browse |
| `/employer/login` | Employer login |
| `/employer/signup` | Company registration |
| `/employer/dashboard` | Post & manage jobs |

## 🎨 Logo Integration Guide

### Where to Add Your Logo

The logo is referenced in multiple places:

1. **Navbar** (Header on every page)
   - Location: `src/components/Navbar.tsx`
   - The logo displays in the top-left corner
   - File: `public/logo.png`

2. **Browser Tab Icon** (Favicon)
   - Location: `src/app/layout.tsx`
   - Automatically uses `/public/logo.png`

3. **Additional Logo Usage**
   - You can add more instances in:
     - Landing page hero section
     - Footer
     - Login/Signup pages backgrounds

### Logo File Requirements

```
File Name: logo.png
Location: /public/logo.png
Recommended Size: 40x40px to 512x512px
Format: PNG (transparent background recommended)
Color: Your brand colors (Blue & Orange)
```

### How to Add/Replace Logo

1. **Replace existing logo:**
   - Place your `logo.png` file in the `public/` folder
   - It automatically updates everywhere the logo is referenced

2. **The logo is already integrated in:**
   - ✅ Navbar (top-left corner)
   - ✅ Browser tab icon/favicon
   - ✅ Mobile menu

### Your Current Logo

Your logo file is already in place at:
```
/public/logo.png
```

The app automatically references it in:
- Navbar component
- HTML head as favicon
- The image displays at 40x40px in navbar, responsive on mobile

## 🎨 Design System

### Color Scheme
```
Primary Blue: #0052cc
Primary Dark: #003fa3
Accent Orange: #ff6b35
Accent Dark: #e55a24
Dark Background: #0a0e27
Light Background: #f0f7ff
```

### Typography
- Font: Inter (from Google Fonts)
- Headings: Bold
- Body: Regular

### Components
- **Buttons**: Two styles (Primary/Secondary)
- **Cards**: Elevated with hover effects
- **Forms**: Consistent input styling with icons
- **Animations**: Smooth transitions and hover effects

## 📝 Customization

### Update Brand Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#0052cc',  // Change primary blue
  },
  accent: {
    500: '#ff6b35',  // Change accent orange
  }
}
```

### Update Company Info

Edit `src/components/Footer.tsx`:
- Company name
- Contact email
- Phone number
- Address

## 🔐 Authentication Setup (Future Implementation)

Currently, the app has mock authentication. To add real authentication:

1. **Backend Setup**: Create API endpoints for:
   - User registration
   - Login
   - Job posting
   - Job search
   - Job applications

2. **Database**: Setup with:
   - PostgreSQL, MongoDB, or Firebase
   - Prisma ORM recommended

3. **Authentication**: Implement with:
   - NextAuth.js or Auth0
   - JWT tokens
   - Secure session management

## 📱 Responsive Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy with one click
4. Environment variables are auto-configured

### Deploy to Other Platforms

The app works with any platform that supports Node.js:
- Netlify
- AWS Amplify
- DigitalOcean
- Heroku
- Docker containers

## 📚 Technology Stack

| Technology | Purpose |
|--|--|
| Next.js 14 | React framework |
| React 18 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| ESLint | Code quality |

## 📄 License

This project is provided as-is for EasyHireTools.

## 🤝 Support

For issues or questions:
- Email: support@easyhiretools.com
- Documentation: See README sections above

---

**Built with ❤️ for EasyHireTools**

Happy Hiring! 🎯
