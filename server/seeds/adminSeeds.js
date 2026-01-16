require('dotenv').config();
const mongoose = require('mongoose');
const { Admin } = require('../models');
const connectDB = require('../config/db');

const createAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@joonstreams.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists');
      process.exit(0);
    }

    // Create admin
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@joonstreams.com',
      password: 'admin123', // Change this in production!
    });

    console.log('✅ Admin created successfully');
    console.log('📧 Email: admin@joonstreams.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  CHANGE THE PASSWORD IN PRODUCTION!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();