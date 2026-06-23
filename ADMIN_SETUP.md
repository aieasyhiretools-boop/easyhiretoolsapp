# Super Admin Dashboard Setup Guide

## 🔐 Super Admin Login Credentials

Your Super Admin account has been created with the following details:

### Login Information
- **Email**: `admin@easyhire.com`
- **Password**: `SuperAdmin123`
- **Role**: Super Admin (Full Access)
- **Login URL**: https://easyhiretoolsapp.vercel.app/admin-login

---

## 📊 Admin Dashboard Features

### 1. **Dashboard Tab** 📈
View comprehensive platform statistics:
- **Total Users**: Count of all registered candidates and employers
- **Total Jobs**: Total job postings on the platform
- **Pending Jobs**: Jobs awaiting admin approval
- **Total Resumes**: Total resumes submitted by candidates

**Quick Actions Available:**
- Manage Users
- Review Jobs
- Refresh Data

---

### 2. **Users Tab** 👥
Complete user management system:

**Features:**
- View all registered users
- Search by name or email
- View user details:
  - Name
  - Email
  - Role (Candidate/Employer)
  - Account type
- Delete user accounts
- Bulk management capabilities

**User Types:**
- 👤 **Candidates** (Job Seekers)
- 🏢 **Employers** (Job Posters)

---

### 3. **Jobs Tab** 💼
Manage all job postings on the platform:

**Features:**
- View all pending job postings
- Search by job title or company name
- Review job details:
  - Job Title
  - Company Name
  - Location
  - Salary
  - Experience Level
  - Job Description
- **Approve** jobs to make them visible to candidates
- **Reject** jobs with optional feedback

**Job Workflow:**
1. Employers post new jobs
2. Jobs appear in "Pending" status
3. Admin reviews job details
4. Admin clicks "Approve" ✅ or "Reject" ❌
5. Approved jobs appear in job listings
6. Candidates can apply to approved jobs

---

## 🚀 How to Use the Admin Dashboard

### Step 1: Login
1. Go to: https://easyhiretoolsapp.vercel.app/admin-login
2. Enter email: `admin@easyhire.com`
3. Enter password: `SuperAdmin123`
4. Click "Login"

### Step 2: Navigate Dashboard
Use the left sidebar to switch between:
- 📊 **Dashboard** - View statistics
- 👥 **Users** - Manage users
- 💼 **Jobs** - Approve/reject jobs

### Step 3: Manage Platform
- **Monitor Growth**: Check total users and jobs
- **Maintain Quality**: Review and approve jobs
- **User Management**: Delete spam or inactive accounts
- **Search Function**: Quickly find users or jobs by name/email

### Step 4: Logout
Click "🚪 Logout" button in the top-right corner

---

## 🛠️ Admin Capabilities

### User Management
✅ View all users  
✅ Delete user accounts  
✅ Search by name/email  
✅ View user type (Candidate/Employer)  

### Job Moderation
✅ Review pending jobs  
✅ Approve job postings  
✅ Reject inappropriate jobs  
✅ View job details and requirements  

### Platform Analytics
✅ View total users count  
✅ View total jobs count  
✅ Monitor pending jobs  
✅ Track resume submissions  

---

## 📱 Dashboard Responsive Design

The Admin Dashboard is fully responsive and works on:
- 💻 Desktop (Full features)
- 📱 Tablets (Optimized layout)
- 📱 Mobile (Touch-friendly interface)

---

## ⚙️ Creating Additional Super Admins

To create another super admin account, run this script locally:

```bash
node scripts/create-admin.js
```

This will:
1. Connect to MongoDB
2. Create a new super admin user
3. Display login credentials

---

## 🔒 Security Notes

- **Change Password**: Update your password after first login (Coming Soon)
- **Keep Credentials Safe**: Never share admin credentials
- **Session Timeout**: Admin sessions expire after 7 days
- **JWT Tokens**: Sessions use secure JWT authentication
- **Database**: All passwords are encrypted with bcryptjs

---

## 📞 Support

If you encounter any issues:

1. **Login Issues**
   - Clear browser cache
   - Try incognito/private mode
   - Verify email and password

2. **Data Not Loading**
   - Refresh the page
   - Click "Refresh Data" button
   - Check internet connection

3. **Approve/Reject Not Working**
   - Ensure you're logged in as admin
   - Check that job exists and is pending
   - Try refreshing and trying again

---

## 🎯 Next Steps

1. ✅ Login to your admin account
2. ✅ Review the platform statistics
3. ✅ Check pending jobs that need approval
4. ✅ Manage users as needed
5. ✅ Monitor platform growth

---

**Platform URL**: https://easyhiretoolsapp.vercel.app/  
**Admin URL**: https://easyhiretoolsapp.vercel.app/admin-login  
**Version**: 1.0.0  
**Last Updated**: 2024

Enjoy managing your EasyHire platform! 🎉
