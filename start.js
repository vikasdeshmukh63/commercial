#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Commercial Management System...\n');

// Check if .env files exist
const rootEnv = path.join(__dirname, '.env');
const clientEnv = path.join(__dirname, 'client', '.env');

if (!fs.existsSync(rootEnv)) {
  console.log('❌ Root .env file not found!');
  console.log('Please create .env file with the following content:');
  console.log(`
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/commercial
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
  `);
  process.exit(1);
}

if (!fs.existsSync(clientEnv)) {
  console.log('❌ Client .env file not found!');
  console.log('Please create client/.env file with the following content:');
  console.log(`
REACT_APP_API_URL=http://localhost:5000/api
GENERATE_SOURCEMAP=true
SKIP_PREFLIGHT_CHECK=true
  `);
  process.exit(1);
}

// Check if node_modules exist
const rootNodeModules = path.join(__dirname, 'node_modules');
const clientNodeModules = path.join(__dirname, 'client', 'node_modules');

if (!fs.existsSync(rootNodeModules) || !fs.existsSync(clientNodeModules)) {
  console.log('📦 Installing dependencies...');
  const install = spawn('npm', ['run', 'install-all'], { stdio: 'inherit' });
  
  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Dependencies installed successfully!');
      startApplication();
    } else {
      console.log('❌ Failed to install dependencies');
      process.exit(1);
    }
  });
} else {
  startApplication();
}

function startApplication() {
  console.log('🔧 Starting development servers...');
  console.log('Backend: http://localhost:5000');
  console.log('Frontend: http://localhost:3000');
  console.log('\n📋 Sample Login Credentials:');
  console.log('Admin: admin@commercial.com / admin123');
  console.log('Partner: partner@commercial.com / partner123');
  console.log('Customer: customer@commercial.com / customer123');
  console.log('\n⚠️  Make sure MongoDB is running before proceeding!');
  console.log('💡 Run "npm run setup" first if this is your first time.\n');
  
  const dev = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  
  dev.on('close', (code) => {
    console.log(`Application exited with code ${code}`);
  });
  
  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down gracefully...');
    dev.kill('SIGINT');
    process.exit(0);
  });
}