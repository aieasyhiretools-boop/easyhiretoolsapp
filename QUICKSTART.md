# 🚀 EasyHireTools Job Portal - Quick Start Guide

Your modern job portal web app is ready to use! Here's everything you need to know to get started.

## ✅ What's Been Created

A fully functional Next.js job portal with:
- ✨ Beautiful, modern UI matching your EasyHireTools branding (Blue & Orange)
- 🔐 Separate login systems for Job Seekers and Employers
- 🏢 Employer dashboard to post jobs
- 🔍 Job seeker search and browsing interface
- 📱 Fully responsive design (works on all devices)
- ⚡ Fast performance optimized for production

## 📂 Project Structure

```
easyhiretools-app/
├── public/
│   └── logo.png                 ← Your EasyHireTools logo (40x40px recommended)
├── src/
│   ├── app/
│   │   ├── page.tsx             ← Home/Landing page
│   │   ├── jobseeker/
│   │   │   ├── login/page.tsx   ← Job seeker login
│   │   │   ├── signup/page.tsx  ← Job seeker registration
│   │   │   └── dashboard/page.tsx ← Browse & search jobs
│   │   └── employer/
│   │       ├── login/page.tsx   ← Employer login
│   │       ├── signup/page.tsx  ← Company registration
│   │       └── dashboard/page.tsx ← Post & manage jobs
│   └── components/
│       ├── Navbar.tsx           ← Navigation with logo
│       └── Footer.tsx           ← Footer with links
├── package.json                 ← Dependencies
├── tailwind.config.ts           ← Tailwind CSS config
├── tsconfig.json                ← TypeScript config
├── next.config.js               ← Next.js config
└── README.md                    ← Full documentation
```

## 🚀 Running the App

### Development Mode (Recommended for testing)
```bash
npm run dev
```
Then open: **http://localhost:3000** in your browser

### Production Build & Run
```bash
npm run build
npm start
```
Then open: **http://localhost:3000**

## 🎨 Where Your Logo Is Used

Your logo file (`public/logo.png`) automatically appears in:

1. **Navbar** (Top-left corner on every page)
   - Location: `src/components/Navbar.tsx`
   - Size: 40x40px displayed

2. **Browser Tab Icon** (Favicon)
   - Automatically used as the website icon in browser tab

3. **Mobile Menu**
   - Logo displays in mobile responsive menu

### How to Update or Replace the Logo

Simply replace the file at:
```
/public/logo.png
```

The app automatically uses the new logo everywhere. No code changes needed!

### Logo Requirements
- **Filename**: `logo.png`
- **Format**: PNG with transparent background (recommended)
- **Recommended Size**: 256x256px or larger (will be scaled automatically)
- **Colors**: Should match your blue (#0052cc) and orange (#ff6b35) branding

## 🔗 All Available Pages

### Home/Public Pages
- `/` - Landing page with overview and features
- `/employer/login` - Employer login (Orange theme)
- `/employer/signup` - Company registration
- `/jobseeker/login` - Job seeker login (Blue theme)
- `/jobseeker/signup` - Job seeker registration

### Dashboards (After Login)
- `/employer/dashboard` - Post and manage jobs
  - Create new job listings
  - View applicants
  - Edit/delete jobs
  - Track views and applications

- `/jobseeker/dashboard` - Search and browse jobs
  - Advanced filtering (job type, location, salary)
  - Search by title or company
  - View job details
  - Save/apply for jobs

## 🎨 Customizing Colors

The app uses your brand colors from the logo:
- **Primary Blue**: #0052cc (#003fa3 on hover)
- **Accent Orange**: #ff6b35 (#e55a24 on hover)

To customize, edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#0052cc',  // Change primary color
  },
  accent: {
    500: '#ff6b35',  // Change accent color
  }
}
```

## 📝 Demo Account Information

Since this is the demo version, here are some test credentials:

**Job Seeker Login:**
- Email: jobseeker@example.com
- Password: password123

**Employer Login:**
- Email: company@example.com
- Password: password123

*(These are examples - currently the app shows mock data. Backend integration needed for real authentication.)*

## 🔐 Future: Adding Real Backend

To make this production-ready, you'll need:

1. **Backend API** - Create endpoints for:
   - User registration/login
   - Job posting/search
   - Applications
   - User profiles

2. **Database** - Set up with:
   - PostgreSQL (recommended)
   - MongoDB, or Firebase

3. **Authentication** - Implement with:
   - NextAuth.js
   - Auth0
   - Firebase Auth
   - JWT tokens

4. **Storage** - For file uploads:
   - Resume uploads
   - Company logos
   - Profile pictures

## 📱 Responsive Design

The app looks great on all devices:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

Test on different devices or use browser DevTools!

## 🎯 Key Features Explained

### Landing Page
- Eye-catching hero section
- Feature highlights
- Statistics/social proof
- Call-to-action buttons

### Job Search Dashboard
- Advanced filters (job type, location)
- Real-time search
- Job detail side panel
- Apply and save buttons

### Employer Dashboard
- Dashboard stats (jobs, applicants, views)
- Post new jobs with form
- Manage existing listings
- Edit/delete functionality

## 🚢 Deploying to Production

### Option 1: Vercel (Easiest)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click!

### Option 2: Other Hosting
Works with any Node.js hosting:
- AWS Amplify
- Netlify
- DigitalOcean
- Heroku
- Docker containers

See `README.md` for detailed deployment instructions.

## 📚 Technologies Used

| Tech | Purpose |
|------|---------|
| Next.js 14 | React framework |
| React 18 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |

##  🤔 Common Questions

**Q: How do I add my company info to the footer?**
A: Edit `src/components/Footer.tsx` - search for "Contact Us" section and update the details.

**Q: Can I change the button colors?**
A: Yes! The buttons automatically use your brand colors from `tailwind.config.ts`. They're also inline styles in components for quick tweaks.

**Q: How do I disable animations?**
A: Remove `transition` and `hover:` classes from components or update `tailwind.config.ts`.

**Q: How do I add more pages?**
A: Create new files in `src/app/`. For example:
- `/about` - Create `src/app/about/page.tsx`
- `/contact` - Create `src/app/contact/page.tsx`

**Q: Will my data be saved?**
A: Currently, this is a frontend demo with mock data. To save data, you need to connect a backend database.

## 🆘 Troubleshooting

**"Port 3000 already in use"**
```bash
npm run dev -- -p 3001  # Use different port
```

**"Module not found" errors**
```bash
npm install  # Reinstall dependencies
```

**"Build fails"**
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📞 Support

- **Documentation**: See full `README.md` in the project root
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React**: [react.dev](https://react.dev)

## 🎉 You're All Set!

Your EasyHireTools job portal is ready to go!

**Next Steps:**
1. ✅ Run `npm run dev`
2. ✅ Visit http://localhost:3000
3. ✅ Explore all the pages
4. ✅ Click around and test the features
5. ✅ Customize with your content

Enjoy building your job platform! 🚀

---

**Built with ❤️ for EasyHireTools**
