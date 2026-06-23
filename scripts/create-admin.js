#!/usr/bin/env node
/**
 * Script to create a Super Admin user in the database
 * Run: node scripts/create-admin.js
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('../backend/models/User');

const createAdmin = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/easyhire', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@easyhire.com', isAdmin: true });
    if (existingAdmin) {
      console.log('⚠️  Super Admin already exists!');
      console.log('📧 Email: admin@easyhire.com');
      console.log('🔐 Password: SuperAdmin123');
      await mongoose.connection.close();
      return;
    }

    // Create Super Admin User
    const adminData = {
      name: 'Super Admin',
      email: 'admin@easyhire.com',
      password: 'SuperAdmin123',
      userType: 'admin',
      isAdmin: true,
      phone: '+1-800-EASYHIRE',
      company: 'EasyHire Tools',
    };

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(adminData.password, salt);

    const admin = new User({
      ...adminData,
      password: hashedPassword,
    });

    await admin.save();

    console.log('✅ Super Admin created successfully!');
    console.log('\n📋 Super Admin Login Details:');
    console.log('================================');
    console.log('📧 Email: admin@easyhire.com');
    console.log('🔐 Password: SuperAdmin123');
    console.log('================================\n');
    console.log('🌐 Login at: https://easyhiretoolsapp.vercel.app/admin-login');

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
